import {
  MessageSquare,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";

import "./Messages.css";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const formatMessageTime = (dateTime) => {
  if (!dateTime) {
    return "";
  }

  return new Date(dateTime).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
const selectedPartnerId = selectedMessage
  ? selectedMessage.senderId === "pu2026"
    ? selectedMessage.receiverId
    : selectedMessage.senderId
  : null;
const conversationMessages = selectedPartnerId
  ? messages.filter((message) => {
      const studentId = "pu2026";

      const partnerId =
        message.senderId === studentId
          ? message.receiverId
          : message.senderId;

      return partnerId === selectedPartnerId;
    })
  : [];
  useEffect(() => {
  const markConversationAsRead = async () => {
    if (!selectedPartnerId) {
      return;
    }

    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.studentId) {
        return;
      }

      await api.put(
        `/messages/read?senderId=${selectedPartnerId}&receiverId=${student.studentId}`
      );

      setMessages((previousMessages) =>
        previousMessages.map((message) => {
          if (
            message.senderId === selectedPartnerId &&
            message.receiverId === student.studentId
          ) {
            return {
              ...message,
              isRead: true,
            };
          }

          return message;
        })
      );

    } catch (error) {
      console.error(
        "Failed to mark messages as read:",
        error
      );
    }
  };

  markConversationAsRead();
}, [selectedPartnerId]);
  useEffect(() => {
  const scrollToBottom = () => {
    const container = document.querySelector(".conversation-messages");

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  requestAnimationFrame(scrollToBottom);
}, [selectedPartnerId, messages.length]);
const handleSendMessage = async () => {
  try {
    const student = JSON.parse(
      localStorage.getItem("student")
    );

    if (!student?.studentId) {
      return;
    }

    const receiverId =
      selectedMessage.senderId === student.studentId
        ? selectedMessage.receiverId
        : selectedMessage.senderId;

    const response = await api.post("/messages", {
      senderId: student.studentId,
      receiverId: receiverId,
      message: newMessage.trim(),
    });

    setMessages((previousMessages) => [
      ...previousMessages,
      response.data,
    ]);

    setSelectedMessage(response.data);

    setNewMessage("");

  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Failed to send message.");
  }
};
  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.studentId) {
        return;
      }

      const response = await api.get(
        `/messages/${student.studentId}`
      );

      setMessages(response.data);

    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  fetchMessages();
}, []);
  const filteredMessages = messages.filter((message) => {
  const studentId = "pu2026";

  const partnerId =
    message.senderId === studentId
      ? message.receiverId
      : message.senderId;

  const searchText = searchTerm.toLowerCase().trim();

  return (
    partnerId.toLowerCase().includes(searchText) ||
    message.message.toLowerCase().includes(searchText)
  );
});

const conversations = Object.values(
  filteredMessages.reduce((groups, message) => {
    const studentId = "pu2026";

    const partnerId =
      message.senderId === studentId
        ? message.receiverId
        : message.senderId;

    groups[partnerId] = message;

    return groups;
  }, {})
);
  return (
    <div className="messages-page">

      {/* Header */}

      <div className="messages-header">

        <div>
          <h1>Messages</h1>

          <p>
            View and manage your messages.
          </p>
        </div>

      </div>


      {/* Messages Layout */}

      <div className="messages-container">

        {/* Conversation List */}

        <div className="messages-sidebar">

          <div className="messages-search">

            <Search size={18} />

            <input
  type="text"
  placeholder="Search messages..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>
          </div>


          <div className="conversation-list">

  {conversations.length === 0 ? (

    <div className="no-conversations">

      <MessageSquare size={32} />

      <h3>No conversations</h3>

      <p>
        Your messages will appear here.
      </p>

    </div>

  ) : (

    conversations.map((message) => (

      <div
        key={message.id}
        className={`conversation-item ${
  selectedMessage?.id === message.id ? "selected" : ""
}`}
        onClick={() => setSelectedMessage(message)}
      >

        <div className="conversation-icon">
          <MessageSquare size={20} />
        </div>

        <div className="conversation-info">

          <h4>
            {message.senderId === "pu2026"
              ? message.receiverId
              : message.senderId}
          </h4>

          <p>
            {message.message}
          </p>

        </div>

      </div>

    ))

  )}

</div>

        </div>


        {/* Message Area */}

        <div className="message-content">

  {selectedMessage ? (

    <>
      <MessageSquare size={48} />

      <h2>
        {selectedMessage.senderId === "pu2026"
          ? selectedMessage.receiverId
          : selectedMessage.senderId}
      </h2>

      <div className="conversation-messages">

  {conversationMessages.map((message) => (

    <div
      key={message.id}
      className={`message-bubble ${
        message.senderId === "pu2026"
          ? "sent"
          : "received"
      }`}
    >

      <p>
        {message.message}
      </p>

      <small>
        {formatMessageTime(message.sentAt)}
      </small>

    </div>

  ))}
  <div ref={messagesEndRef} />

</div>

      <div className="message-input-area">

        <input
  type="text"
  placeholder="Type a message..."
  value={newMessage}
  onChange={(event) => setNewMessage(event.target.value)}
/>
        <button
  type="button"
  onClick={handleSendMessage}
>
  Send
</button>

      </div>
    </>

  ) : (

    <>
      <MessageSquare size={48} />

      <h2>Select a conversation</h2>

      <p>
        Choose a conversation to view your messages.
      </p>
    </>

  )}

</div>
      </div>

    </div>
  );
}

export default Messages;