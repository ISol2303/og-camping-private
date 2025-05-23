// Script để hiển thị tóm tắt cuộc trò chuyện
document.addEventListener("DOMContentLoaded", () => {
  const chatSummaryElement = document.getElementById("chatSummary")
  if (!chatSummaryElement) return

  const lastChatResponse = sessionStorage.getItem("lastChatResponse")
  if (!lastChatResponse) {
    chatSummaryElement.textContent = "Không có thông tin cuộc trò chuyện."
    return
  }

  try {
    const messages = JSON.parse(lastChatResponse)

    // Hiển thị tóm tắt cuộc trò chuyện
    let summaryHTML = ""
    messages.forEach((message) => {
      const role = message.role === "user" ? "Bạn" : "Trợ lý AI"
      const content = message.content.length > 100 ? message.content.substring(0, 100) + "..." : message.content

      summaryHTML += `<p><strong>${role}:</strong> ${content}</p>`
    })

    chatSummaryElement.innerHTML = summaryHTML
  } catch (error) {
    chatSummaryElement.textContent = "Không thể hiển thị thông tin cuộc trò chuyện."
  }
})
