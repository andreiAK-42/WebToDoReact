import "./TaskShare.css";

function TaskShare({ visible, onClose, taskTitle, taskAbout }) {
  const textToCopy = `${taskTitle || ""}\n${taskAbout || ""}`.trim();

  const handleShare = (type) => async () => {
    if (type === "copy" && navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (e) {
        console.error("Не удалось скопировать текст", e);
      }
    }
    onClose?.();
  };

  return (
    <>
      <div
        className={`share-menu-container ${visible ? "visible" : "hidden"}`}
        onClick={onClose}
      >
        <div className="share-menu" onClick={(e) => e.stopPropagation()}>
          <div
            id="copy"
            className="round-share-button"
            onClick={handleShare("copy")}
          >
            <img src="../../assets/icons/Content copy.png" />
          </div>
          <div
            id="vk"
            className="round-share-button"
            onClick={handleShare("vk")}
          >
            <img src="../../assets/icons/vk-svgrepo-com 1.png" />
          </div>
          <div
            id="telegram"
            className="round-share-button"
            onClick={handleShare("telegram")}
          >
            <img src="../../assets/icons/telegram-svgrepo-com 1.png" />
          </div>
          <div
            id="whatsapp"
            className="round-share-button"
            onClick={handleShare("whatsapp")}
          >
            <img src="../../assets/icons/whatsapp-svgrepo-com (1) 1.png" />
          </div>
          <div
            id="facebook"
            className="round-share-button"
            onClick={handleShare("facebook")}
          >
            <img src="../../assets/icons/facebook-alt-svgrepo-com 1.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskShare;

