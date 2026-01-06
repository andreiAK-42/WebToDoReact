import { MouseEvent } from "react";
import "./TaskShare.css";

interface TaskShareProps {
  visible: boolean;
  onClose: () => void;
  taskTitle: string;
  taskAbout: string;
}

type ShareType = "copy" | "vk" | "telegram" | "whatsapp" | "facebook";

function TaskShare({ visible, onClose, taskTitle, taskAbout }: TaskShareProps) {
  const textToCopy = `${taskTitle || ""}\n${taskAbout || ""}`.trim();

  const handleShare = (type: ShareType) => async () => {
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
        <div className="share-menu" onClick={(e: MouseEvent) => e.stopPropagation()}>
          <div
            id="copy"
            className="round-share-button"
            onClick={handleShare("copy")}
          >
            <img src="../../assets/icons/Content copy.png" alt="Copy" />
          </div>
          <div
            id="vk"
            className="round-share-button"
            onClick={handleShare("vk")}
          >
            <img src="../../assets/icons/vk-svgrepo-com 1.png" alt="VK" />
          </div>
          <div
            id="telegram"
            className="round-share-button"
            onClick={handleShare("telegram")}
          >
            <img src="../../assets/icons/telegram-svgrepo-com 1.png" alt="Telegram" />
          </div>
          <div
            id="whatsapp"
            className="round-share-button"
            onClick={handleShare("whatsapp")}
          >
            <img src="../../assets/icons/whatsapp-svgrepo-com (1) 1.png" alt="WhatsApp" />
          </div>
          <div
            id="facebook"
            className="round-share-button"
            onClick={handleShare("facebook")}
          >
            <img src="../../assets/icons/facebook-alt-svgrepo-com 1.png" alt="Facebook" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskShare;
