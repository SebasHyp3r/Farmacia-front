// import { createContext, ReactNode, useContext, useState } from "react";

// const ChatContext = createContext(false)
// const UpdateChatContext = createContext(() => {})

// export function useChatContext () {
//   return useContext(ChatContext)
// }

// export function useUpdateChatContext () {
//   return useContext(UpdateChatContext)
// }



// export function HomeModalProvider ({children} : {children: ReactNode}) {

//   // const [chatModal, setChatModal] = useState(false)

//   const a = () => {
//     console.log("kajsdks")
//   }

//   return (
//     <ChatContext.Provider value={chatModal}>
//       <UpdateChatContext.Provider value={a}>
//         {children}
//       </UpdateChatContext.Provider>
//     </ChatContext.Provider>
//   )

// }