import React from "react";

function ChatStatus() {
  return (
    <>
      <div
        to="/"
        className="message-item"
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
          className="img-src"
          alt=""
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "greenyellow",
              }}
            ></span>
          </div>
          <span>Đang trực tuyến</span>
        </div>
      </div>
    </>
  );
}

export default ChatStatus;
