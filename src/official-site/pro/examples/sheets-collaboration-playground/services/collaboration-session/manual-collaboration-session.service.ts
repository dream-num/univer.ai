import type { Nullable } from '@univerjs/core'
import { DisposableCollection, IConfigService, ILogService, ISnapshotServerService, toDisposable } from '@univerjs/core'
import { HTTPService, WebSocketService } from '@univerjs/network'
import { CmdRspCode, CombCmd } from '@univerjs/protocol'
import type {
  ICombRequestEvent,
  ICombResponseEvent,
  IFetchingMissEvent,
  IPseudoFetchMissingResultEvent,
  IRecvResponseEvent,
  ISubmitChangesetEvent,
} from '@univerjs-pro/collaboration'
import { CollaborationEvent } from '@univerjs-pro/collaboration'
import type { ICollaborationSocket, ICollaborationSocketService } from '@univerjs-pro/collaboration-client'
import {
  CollaborationSocketService,
  deserializeToCombResponse,
  serializeCombRequest,
} from '@univerjs-pro/collaboration-client'
import { Inject } from '@wendellhu/redi'
import type { Observable } from 'rxjs'
import { BehaviorSubject, Subject } from 'rxjs'

export interface IManualCollaborationSocketService extends ICollaborationSocketService {
  get socket(): Nullable<IManualCollaborationSocket>

  createSocket: (url: string) => IManualCollaborationSocket
}

export interface IManualCollaborationSocket extends ICollaborationSocket {
  letSend: () => boolean
  letReceive: () => boolean

  pendingRequests$: Observable<ICombRequestEvent[]>
  pendingMessages$: Observable<ICombResponseEvent[]>
}

/**
 * This socket service implementation is for manually testing collaboration in the playground.
 * It will connect to the collaboration server and join the room like the normal socket service does,
 * but it will not send any changesets or pass remote changeset to the collaboration session
 * util the tester manually tell it to do so.
 */
export class ManualCollaborationSocketService
  extends CollaborationSocketService
  implements IManualCollaborationSocketService {
  socket: Nullable<IManualCollaborationSocket>

  constructor(
    @Inject(HTTPService) http: HTTPService,
        @Inject(WebSocketService) ws: WebSocketService,
        @IConfigService configService: IConfigService,
        @ILogService logService: ILogService,
        @ISnapshotServerService snapshotServerService: ISnapshotServerService,
  ) {
    super(http, ws, configService, logService, snapshotServerService)
  }

  override createSocket(URL: string): IManualCollaborationSocket {
    const ws = this._ws.createSocket(URL)
    if (!ws) {
      throw new Error('[CollaborationSocketService]: failed to create socket!')
    }

    const disposables = new DisposableCollection()

    const closeSource$ = new Subject<CloseEvent>()
    disposables.add(toDisposable(ws.close$.subscribe(event => closeSource$.next(event))))
    disposables.add(toDisposable(() => closeSource$.complete()))

    const errorSource$ = new Subject<Event>()
    disposables.add(toDisposable(ws.error$.subscribe(event => errorSource$.next(event))))
    disposables.add(toDisposable(() => errorSource$.complete()))

    /** This queue caches all messages from the collaboration server. */
    const queuedMessages: ICombResponseEvent[] = []
    const pendingMessages$ = new BehaviorSubject<ICombResponseEvent[]>(queuedMessages)
    const messageSource$ = new Subject<ICombResponseEvent>()
    disposables.add(
      toDisposable(
        ws.message$.subscribe((event: MessageEvent) => {
          const response = deserializeToCombResponse(event)
          if (shouldHold(response)) {
            queuedMessages.push(response)
            pendingMessages$.next(queuedMessages)
          } else {
            messageSource$.next(response)
          }
        }),
      ),
    )
    disposables.add(toDisposable(() => messageSource$.complete()))

    const terminateWithError = () => {
      errorSource$.next(new Event('connection error'))
      closeSource$.next(new CloseEvent('connection error'))
      this.socket?.close()
    }

    const sendQueue: ICombRequestEvent[] = []
    const pendingRequests$ = new BehaviorSubject<ICombRequestEvent[]>(sendQueue)
    const send = (event: ICombRequestEvent) => {
      if (event.cmd === CombCmd.INGEST) {
        if (event.data.eventID === CollaborationEvent.SUBMIT_CHANGESET) {
          // eslint-disable-next-line ts/no-use-before-define
          this._submitChangeset(socket, event.data as ISubmitChangesetEvent).catch((error) => {
            this._logService.error(error)

            terminateWithError()
          })

          return
        }

        if (event.data.eventID === CollaborationEvent.FETCH_MISSING) {
          const collabEvent = event.data as IFetchingMissEvent
          this._fetchMissChangesets(collabEvent)
            .then((changesets) => {
              messageSource$.next({
                cmd: CombCmd.RECV,
                code: CmdRspCode.OK,
                routeKey: collabEvent.data.unitID,
                routeType: '',
                data: {
                  eventID: CollaborationEvent.PSEUDO_FETCH_MISSING_RESULT,
                  data: {
                    changesets,
                  },
                } as IPseudoFetchMissingResultEvent,
              } as IRecvResponseEvent)
            })
            .catch((error) => {
              this._logService.error(error)
              terminateWithError()
            })

          return
        }
      }

      ws.send(serializeCombRequest(event))
    }

    const socket: IManualCollaborationSocket = {
      memberID: '',
      close$: closeSource$.asObservable(),
      error$: errorSource$.asObservable(),
      open$: ws.open$,
      message$: messageSource$.asObservable(),

      pendingMessages$,
      pendingRequests$,

      send: (event: ICombRequestEvent): void => {
        if (shouldHold(event)) {
          sendQueue.push(event)
          pendingRequests$.next(sendQueue)
        } else {
          send(event)
        }
      },
      close: () => {
        ws.close()
        disposables.dispose()
      },

      letReceive() {
        if (!queuedMessages.length) {
          return false
        }

        messageSource$.next(queuedMessages[0])
        queuedMessages.splice(0, 1)
        pendingMessages$.next(queuedMessages)

        return true
      },

      letSend() {
        if (!sendQueue.length) {
          return false
        }

        send(sendQueue[0])
        sendQueue.splice(0, 1)
        pendingRequests$.next(sendQueue)

        return true
      },
    }

    this.socket = socket

    return socket
  }
}

function shouldHold(event: ICombRequestEvent | ICombResponseEvent): boolean {
  return (
    (event.cmd === CombCmd.INGEST || event.cmd === CombCmd.RECV)
    && event.data.eventID !== CollaborationEvent.USERS_ENTER
    && event.data.eventID !== CollaborationEvent.USERS_LEAVE
    && event.data.eventID !== CollaborationEvent.UPDATE_CURSOR
  )
}
