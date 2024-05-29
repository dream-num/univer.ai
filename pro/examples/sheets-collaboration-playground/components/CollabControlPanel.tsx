import { animated, useSpring } from '@react-spring/web'
import { MoreDownSingle, MoreUpSingle } from '@univerjs/icons'
import type { ICollaborationEvent, ICombRequestEvent, ICombResponseEvent, INewChangesetsEvent } from '@univerjs-pro/collaboration'
import React, { useEffect, useState } from 'react'

import type {
  IManualCollaborationSocket,
  IManualCollaborationSocketService,
} from '../services/collaboration-session/manual-collaboration-session.service'

export interface ICollaborationPanelProps {
  serviceAlice: IManualCollaborationSocketService
  serviceBob: IManualCollaborationSocketService
}

/**
 * This component is for testers to control the collaboration sending & receiving.
 * @param props
 * @returns
 */
export function CollaborationControlPanel(props: ICollaborationPanelProps) {
  const { serviceAlice, serviceBob } = props
  const socketAlice = serviceAlice.socket
  const socketBob = serviceBob.socket

  useEffect(() => {
    // Only perform the following logic when both sockets are ready.
    if (!socketAlice || !socketBob) {
      return
    }

    socketAlice.pendingRequests$.subscribe((_requests) => { })
  }, [socketAlice, socketBob])

  if (!socketAlice || !socketBob) {
    return null
  }

  return (
    <div className="flex h-full justify-around p-[12px_24px]">
      <CollaborationControlSegment socket={socketAlice} />
      <CollaborationControlSegment socket={socketBob} />
    </div>
  )
}

interface ICollaborationControlSegmentProps {
  socket: IManualCollaborationSocket
}

function CollaborationControlSegment(props: ICollaborationControlSegmentProps) {
  const { socket } = props
  const [pendingRequests, setPendingRequests] = useState<ICombRequestEvent[]>([])
  const [pendingMessages, setPendingMessages] = useState<ICombResponseEvent[]>([])
  const [requestsInfo, setRequestsInfo] = useState<string[]>([])
  const [messagesInfo, setMessagesInfo] = useState<string[]>([])

  const [sendSprings, sendAPI] = useSpring(() => ({
    from: { offset: 0, opacity: 0 },
  }))
  const [receiveSprings, receiveAPI] = useSpring(() => ({
    from: { offset: 0, opacity: 0 },
  }))

  const sendRequest = () => {
    if (pendingRequests.length === 1) {
      socket.letSend()
      sendAPI.start({
        from: { offset: 50, opacity: 1 },
        to: { offset: 100, opacity: 0 },
      })
    }
  }

  const receiveResponse = () => {
    if (pendingMessages.length === 1) {
      receiveAPI.start({
        from: { offset: 50, opacity: 1 },
        to: { offset: 100, opacity: 0 },
      })
    }

    socket.letReceive()
  }

  // subscribe to the socket's pending requests and messages
  useEffect(() => {
    const requestsSubscription = socket.pendingRequests$.subscribe((requests) => {
      if (requests.length > 0) {
        const mutationIds = (requests[0].data as any)?.data.changeset.mutations.map((mutation: { id: string }) => mutation.id)

        setRequestsInfo(mutationIds)
      }
      setPendingRequests(requests)
      if (requests.length > 0) {
        sendAPI.start({
          from: { offset: 0, opacity: 0 },
          to: { offset: 50, opacity: 1 },
        })
      }
    })

    const messagesSubscription = socket.pendingMessages$.subscribe((messages) => {
      if (messages.length > 0) {
        const mutationIds: string[] = []
        messages.forEach((message) => {
          const messageData = message.data as ICollaborationEvent
          if (messageData.eventID !== 'changeset_ack') {
            (messageData as INewChangesetsEvent).data?.mutations?.forEach((item: { id: string }) => {
              mutationIds.push(item.id)
            })
          }
        })

        setMessagesInfo(mutationIds)
      }
      if (messages.length > 0) {
        receiveAPI.start({
          from: { offset: 0, opacity: 0 },
          to: { offset: 50, opacity: 1 },
        })
      }

      setPendingMessages(messages)
    })

    return () => {
      requestsSubscription.unsubscribe()
      messagesSubscription.unsubscribe()
    }
  }, [receiveAPI, sendAPI, socket])

  return (
    <div className="flex justify-center">
      <div className="relative w-[48px]">
        {pendingRequests.map((request, index) => (
          <div key={index} className="text-nowrap text-xs">
            {`${request.cmd}/${(request.data as any).eventID}`}
          </div>
        ))}
        <div
          className={`
            absolute left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 cursor-pointer items-center
            justify-center rounded-full bg-black text-white
          `}
          onClick={sendRequest}
        >
          <MoreUpSingle />
        </div>
        <div className="absolute left-1/2 h-full w-0 border border-dashed border-gray-400" />
        <div>
          <animated.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gray-400"
            style={{
              opacity: sendSprings.opacity.to(x => x),
              top: sendSprings.offset.to(x => `calc(${100 - x}%)`),
            }}
          >
            <ul className={`
              absolute left-3.5 -translate-y-[50%] list-none text-nowrap p-0 text-[9px]
            `}
            >
              {requestsInfo.map((mutationId, i) => (
                <li key={i} className={`before:mr-0 before:content-['•']`}>{mutationId}</li>
              ))}
            </ul>
          </animated.div>
        </div>
      </div>
      <div className="relative ml-[120px] w-[48px]">
        {pendingMessages.map((messages, index) => (
          <div key={index} className="text-nowrap text-xs">
            {`${messages.cmd}/${(messages.data as any).eventID}`}
          </div>
        ))}
        <div
          className={`
            absolute bottom-0 left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 cursor-pointer
            items-center justify-center rounded-full bg-black text-white
          `}
          onClick={receiveResponse}
        >
          <MoreDownSingle />
        </div>
        <div className="absolute left-1/2 h-full w-0 border border-dashed border-gray-400" />
        <div>
          <animated.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gray-400"
            style={{
              opacity: receiveSprings.opacity.to(x => x),
              top: receiveSprings.offset.to(x => `calc(${x}%)`),
            }}
          >
            <ul className={`
              absolute left-3.5 -translate-y-[50%] list-none text-nowrap p-0 text-[9px]
            `}
            >
              {messagesInfo.map((mutationId, i) => (
                <li
                  key={i}
                  className={`before:mr-0 before:content-['•']`}
                >
                  {mutationId}
                </li>
              ))}
            </ul>
          </animated.div>
        </div>
      </div>
    </div>
  )
}
