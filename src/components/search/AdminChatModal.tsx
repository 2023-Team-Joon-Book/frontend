import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import sendImg from '../../assets/images/send.png'
import axios, { AxiosError } from 'axios'
import ChatModal from './ChatModal'

interface AdminChatProps {
  disableHandleAsk: () => void
  userName: string
  // userAuth: string
  isAdmin: boolean
}

interface ChatRoom {
  chat_room_id: number
  nickname: string
}
// const sender = sunjae333

const AdminChat: React.FC<AdminChatProps> = ({ disableHandleAsk, userName, isAdmin }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>()
  // const user = userName
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const access = localStorage.getItem('accessToken') // 토큰 저장
  const [isAsk, setIsAsk] = useState(false)

  // 채팅방 조회 api
  async function roomInfo() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/chat/rooms/list', {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log('응답 값', response.data)
      const roomData: ChatRoom[] = response.data.data
      setChatRooms(roomData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    roomInfo()
  }, [])

  // const handleChatRoom = () => {
  //   setIsAsk(true)
  // }
  // useEffect(() => {
  //   console.log(chatRooms)
  // }, [chatRooms])

  return (
    <>
      {isSelect ? (
        <ChatModal
          selectedRoomId={selectedRoomId}
          userName={userName}
          isAdmin={isAdmin}
          disableHandleAsk={disableHandleAsk}
        />
      ) : (
        <ChatContainer>
          <Header>
            <Title>
              <TitleImg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="40"
                  viewBox="0 0 54 47"
                  fill="none">
                  <path
                    d="M54 22.0343C54 34.2035 41.9108 44.0686 27 44.0686C24.3258 44.0719 21.6627 43.7481 19.0789 43.1053C17.1079 44.0371 12.582 45.825 4.968 46.9897C4.293 47.0904 3.78 46.4357 4.04663 45.8502C5.24137 43.2187 6.32137 39.7121 6.64537 36.5139C2.511 32.6422 0 27.5743 0 22.0343C0 9.86506 12.0892 0 27 0C41.9108 0 54 9.86506 54 22.0343ZM16.875 22.0343C16.875 21.1994 16.5194 20.3988 15.8865 19.8085C15.2535 19.2182 14.3951 18.8865 13.5 18.8865C12.6049 18.8865 11.7464 19.2182 11.1135 19.8085C10.4806 20.3988 10.125 21.1994 10.125 22.0343C10.125 22.8691 10.4806 23.6698 11.1135 24.2601C11.7464 24.8504 12.6049 25.182 13.5 25.182C14.3951 25.182 15.2535 24.8504 15.8865 24.2601C16.5194 23.6698 16.875 22.8691 16.875 22.0343ZM30.375 22.0343C30.375 21.1994 30.0194 20.3988 29.3865 19.8085C28.7535 19.2182 27.8951 18.8865 27 18.8865C26.1049 18.8865 25.2465 19.2182 24.6135 19.8085C23.9806 20.3988 23.625 21.1994 23.625 22.0343C23.625 22.8691 23.9806 23.6698 24.6135 24.2601C25.2465 24.8504 26.1049 25.182 27 25.182C27.8951 25.182 28.7535 24.8504 29.3865 24.2601C30.0194 23.6698 30.375 22.8691 30.375 22.0343ZM40.5 25.182C41.3951 25.182 42.2535 24.8504 42.8865 24.2601C43.5194 23.6698 43.875 22.8691 43.875 22.0343C43.875 21.1994 43.5194 20.3988 42.8865 19.8085C42.2535 19.2182 41.3951 18.8865 40.5 18.8865C39.6049 18.8865 38.7465 19.2182 38.1135 19.8085C37.4806 20.3988 37.125 21.1994 37.125 22.0343C37.125 22.8691 37.4806 23.6698 38.1135 24.2601C38.7465 24.8504 39.6049 25.182 40.5 25.182Z"
                    fill="white"
                  />
                </svg>
              </TitleImg>
              문의하기(관리자)
            </Title>
            <CloseButton onClick={disableHandleAsk}>X</CloseButton>
          </Header>
          <MessageList>
            <ChatRoomList>
              {chatRooms.map((room, index) => (
                <div
                  key={index}
                  className="chat-room-item"
                  onClick={() => {
                    setSelectedRoomId(room.chat_room_id.toString())
                    setIsSelect(true)
                  }}
                  style={{ fontFamily: 'bmfont' }}>
                  {room.nickname}
                </div>
              ))}
            </ChatRoomList>
          </MessageList>

          <InputBox>
            <InputField type="text" placeholder="채팅방을 선택해주세요" />
            <SendButton></SendButton>
          </InputBox>
        </ChatContainer>
      )}
    </>
  )
}

export default AdminChat

const ChatContainer = styled.div`
  width: 35rem;
  height: 50rem;
  border-radius: 2.5rem;
  background: #fff;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 20px;
  right: 50px;
  z-index: 1000;
`

const Header = styled.div`
  width: 35rem;
  height: 6rem;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  display: flex;
  justify-content: space-between;
  background: rgba(51, 109, 26, 0.9);
  align-items: center;
  padding: 16px;
  font-family: 'bmfont';
`

const Title = styled.h3`
  display: flex;
  color: #fff;
  font-size: 30px;
`
const TitleImg = styled.h3`
  display: flex;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
`
const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
`

const InputBox = styled.div`
  width: 33rem;
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #ccc;
`

const InputField = styled.input`
  height: 4rem;
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 20px;
`

const SendButton = styled.button`
  width: 3rem;
  height: 3rem;
  margin-left: 8px;
  padding: 16px;
  background: url(${sendImg}) center/cover no-repeat; /* 이미지 경로 설정 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const ChatRoomList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;

  // 채팅방 목록 아이템의 스타일
  .chat-room-item {
    font-size: 25px;
    padding: 10px;
    margin: 4px;
    border: solid 2px #e0e0e0;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`
const MessageList = styled.div`
  width: 35rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`
