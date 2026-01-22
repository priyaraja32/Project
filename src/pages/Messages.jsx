import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BASE =
  "https://api.sheety.co/09934dbeb4cdbd806015e7f281dc4805/skillswap/";

export default function Messages() {
  const currentUserId = 1;

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  /* FETCH USERS + MESSAGES */
  useEffect(() => {
    fetch(`${BASE}/users`)
      .then((res) => res.json())
      .then((d) =>
        setUsers(
          (d.users || []).map((u) => ({
            ...u,
            online: true,
            avatar: u.avatar || `https://i.pravatar.cc/150?img=${u.id}`,
          }))
        )
      );

    fetch(`${BASE}/messages`)
      .then((res) => res.json())
      .then((d) => setMessages(d.messages || []));
  }, []);

  /* FILTERED USERS */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  /* CHAT MESSAGES */
  const chatMessages = selectedUser
    ? messages.filter(
        (m) =>
          (Number(m.senderid) === currentUserId &&
            Number(m.receiverid) === selectedUser.id) ||
          (Number(m.receiverid) === currentUserId &&
            Number(m.senderid) === selectedUser.id)
      )
    : [];

  /* SEND MESSAGE */
  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    const newMsg = {
      id: Date.now(),
      senderid: currentUserId,
      receiverid: selectedUser.id,
      message: input,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    /* AUTO REPLY (DEMO) */
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          senderid: selectedUser.id,
          receiverid: currentUserId,
          message: "Got it 👍",
          timestamp: "Just now",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-80px)] bg-gray-50">
        {/* LEFT PANEL */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Messages</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users"
              className="mt-3 w-full px-3 py-2 text-sm border rounded-lg"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer
                  border-b border-gray-200 hover:bg-gray-50 transition
                  ${selectedUser?.id === u.id ? "bg-gray-100" : ""}
                `}
              >
                <span
                  className={`w-[3px] h-8 rounded-full mr-1
                    ${
                      selectedUser?.id === u.id
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }
                  `}
                />

                <img
                  src={u.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-green-600">Online</p>
                </div>

                <span className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            ))}
          </div>
        </aside>

        {/* CHAT AREA */}
        <section className="flex-1 flex flex-col">
          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a conversation
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200">
                <img
                  src={selectedUser.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3">
                {chatMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-md px-4 py-2 rounded-2xl text-sm shadow-sm
                      ${
                        Number(m.senderid) === currentUserId
                          ? "bg-blue-600 text-white self-end"
                          : "bg-gray-100 text-gray-800 self-start"
                      }
                    `}
                  >
                    {m.message}
                    <div className="text-[10px] opacity-60 mt-1 text-right">
                      {m.timestamp}
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT */}
              <div className="flex gap-2 p-4 bg-white border-t border-gray-200">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
