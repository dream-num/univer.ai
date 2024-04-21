import { animated, useSpring } from '@react-spring/web'
import { MoreDownSingle, MoreUpSingle } from '@univerjs/icons'
import type { ICombRequestEvent, ICombResponseEvent } from '@univerjs-pro/collaboration'
import React, { useEffect, useState } from 'react'

import type {
  IManualCollaborationSocket,
  IManualCollaborationSocketService,
} from '../services/collaboration-session/manual-collaboration-session.service'
import styles from './index.module.less'

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
    <div className={styles.collaborationControlPanel}>
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
          (message.data as any).data.mutations.forEach((item: { id: string }) => {
            mutationIds.push(item.id)
          })
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
  }, [socket])

  return (
    <div className={styles.collaborationControlSegment}>
      <div className={styles.collaborationControlSend}>
        {pendingRequests.map((request, index) => (
          <div key={index} className={styles.collaborationControlSendRequest}>
            {`${request.cmd}/${(request.data as any).eventID}`}
          </div>
        ))}
        <div className={styles.collaborationControlSendButton} onClick={sendRequest}>
          <MoreUpSingle />
        </div>
        <div className={styles.collaborationControlSendLine} />
        <div className={styles.collaborationControlSendTrack}>
          <animated.div
            className={styles.collaborationControlSendTrackBar}
            style={{
              opacity: sendSprings.opacity.to(x => x),
              top: sendSprings.offset.to(x => `calc(${100 - x}%)`),
            }}
          >
            <ul>
              {
                requestsInfo.map((mutationId, i) => (
                  <li key={i}>{mutationId}</li>
                ))
              }
            </ul>
            {/* <div>
                {pendingRequests.map((requests, index) => (
                    <ul key={index}>
                        {requests?.data.data.changeset.mutations.map((mutation,i) => (
                            <li key={i}>{mutation.id}</li>
                        ))}
                    </ul>
                ))}
            </div> */}
          </animated.div>
        </div>
      </div>
      <div className={styles.collaborationControlReceive}>
        {pendingMessages.map((messages, index) => (
          <div key={index} className={styles.collaborationControlSendRequest}>
            {`${messages.cmd}/${(messages.data as any).eventID}`}
          </div>
        ))}
        <div className={styles.collaborationControlReceiveButton} onClick={receiveResponse}>
          <MoreDownSingle />
        </div>
        <div className={styles.collaborationControlSendLine} />
        <div className={styles.collaborationControlSendTrack}>
          <animated.div
            className={styles.collaborationControlSendTrackBar}
            style={{
              opacity: receiveSprings.opacity.to(x => x),
              top: receiveSprings.offset.to(x => `calc(${x}%)`),
            }}
          >
            <ul> {
              messagesInfo.map((mutationId, i) => (
                <li key={i}>{mutationId}</li>
              ))
            }
            </ul>
            {/* <div>
                {pendingMessages.map((messages, index) => (
                    <ul key={index}>
                        {messages?.data.data.mutations.map((mutation,i) => (
                            <li key={i}>{mutation.id}</li>
                        ))}
                    </ul>
                ))}
            </div> */}
          </animated.div>
        </div>
      </div>
    </div>
  )
}
