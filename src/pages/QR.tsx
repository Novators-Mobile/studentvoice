import React, { useRef } from "react";
import Button from "../components/Button";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function QR() {
  const navigate = useNavigate();
  const qrRef = useRef<HTMLCanvasElement>(null);
  const qrLink = "https://studvoice.netlify.app/ergerg/viewform";

  const downloadQR = () => {
    const canvas = qrRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png";
      link.click();
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(qrLink).then(() => {
      // alert("Ссылка скопирована в буфер обмена!");
    });
  };

  return (
    <div className="qr">
      <h1 className="qr-header header-text">QR-код пары</h1>

      <div className="qr__buttons_wrap">
        <Button text="Скачать" onClick={downloadQR} />
        <Button text="Скопировать ссылку" onClick={copyLinkToClipboard} />
      </div>

      <a href={qrLink} target="_blank" className="qr__wrap">
        <QRCodeCanvas value={qrLink} size={449} ref={qrRef} />
      </a>

      <Button text="Назад" onClick={() => navigate(-1)} />
    </div>
  );
}

export default React.memo(QR);
