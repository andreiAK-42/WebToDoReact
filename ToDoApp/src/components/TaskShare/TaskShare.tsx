import { MouseEvent } from "react";
import "./TaskShare.css";
import copyIcon from "../../assets/icons/Content copy.png";
import vkIcon from "../../assets/icons/vk-svgrepo-com 1.png";
import telegramIcon from "../../assets/icons/telegram-svgrepo-com 1.png";
import whatsappIcon from "../../assets/icons/whatsapp-svgrepo-com (1) 1.png";
import facebookIcon from "../../assets/icons/facebook-alt-svgrepo-com 1.png";

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
            <img src={copyIcon} alt="Copy" />
          </div>
          <div
            id="vk"
            className="round-share-button"
            onClick={handleShare("vk")}
          >
            <img src={vkIcon} alt="VK" />
          </div>
          <div
            id="telegram"
            className="round-share-button"
            onClick={handleShare("telegram")}
          >
            <img src={telegramIcon} alt="Telegram" />
          </div>
          <div
            id="whatsapp"
            className="round-share-button"
            onClick={handleShare("whatsapp")}
          >
            <img src={whatsappIcon} alt="WhatsApp" />
          </div>
          <div
            id="facebook"
            className="round-share-button"
            onClick={handleShare("facebook")}
          >
            <img src={facebookIcon} alt="Facebook" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskShare;
