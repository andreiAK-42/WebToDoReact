import { useState, useEffect } from "react";

function TaskShare({ taskId, onTaskShare }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!taskId);
  }, [taskId]);

  const handleShare = (type) => {
    return () => {
      console.log(`Поделились таской с id ${taskId} через ${type}`);
      setIsVisible(false);
      onTaskShare();
    };
  };

  return (
    <>
      <div
        className={`share-menu-container ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="share-menu">
          <div
            id="copy"
            className="round-share-button"
            onClick={handleShare("копирование")}
          >
            <img src="../src/assets/icons/Content Copy.png" />
          </div>
          <div
            id="vk"
            className="round-share-button"
            onClick={handleShare("вконтакте")}
          >
            <img src="../src/assets/icons/vk-svgrepo-com 1.png" />
          </div>
          <div
            id="telegram"
            className="round-share-button"
            onClick={handleShare("телеграм")}
          >
            <img src="../src/assets/icons/telegram-svgrepo-com 1.png" />
          </div>
          <div
            id="whatsapp"
            className="round-share-button"
            onClick={handleShare("whatsapp")}
          >
            <img src="../src/assets/icons/whatsapp-svgrepo-com (1) 1.png" />
          </div>
          <div
            id="facebook"
            className="round-share-button"
            onClick={handleShare("facebook")}
          >
            <img src="../src/assets/icons/facebook-alt-svgrepo-com 1.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskShare;
