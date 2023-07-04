export default function LoginQr(props) {
    return (
        <>
            <div className="login_qr scan_qr ">
                <div
                    className="qrcode"
                    id="qrcode"
                    title='{"QRType":"QRLoginPc","idQR":"YTEyNjM0MmMtZjk1NS00YzkyLTgxOGQtMjhjNzM1ZGJkNWM5++","IdComputer":"a126342c-f955-4c92-818d-28c735dbd5c9","NameComputer":"Chrome, version: 113.0.0.0","latitude":"","longitude":"","Time":"29/5/2023 22:39"}'
                >
                    <canvas width={185} height={185} style={{ display: "none" }} />
                    <img
                        style={{ display: "block" }}
                        src="../img/qr_login.png"
                    />
                </div>
                <p className="text_qr">Sử dụng ứng dụng Chat365 để quét mã QR</p>
                <button type="button" className="help_qr" onClick={props.helper_login}>Hướng dẫn quét</button>
            </div>

        </>
    )
}
