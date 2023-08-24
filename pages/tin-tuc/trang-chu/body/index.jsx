import styles from "../index.module.css"
import Image from "next/image"
import {Carousel} from "antd";
const Body = () => {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div className={styles.box_hot_new}>
            <div className={styles.hot_new1}>
                <div className={styles.divBig}>
                    <img src={"/abc.png"} alt={"anc"}/>
                    <div className={styles.img_banner}>
                        <h3>
                            [Câu hỏi] Các ưu điểm vượt trội của chấm công
                        </h3>
                        <p>
                            Đã từ lâu, cách chấm công ứng viên đã trở thành một chủ đề rất đáng quan tâm đối với các ứng viên. Bởi không phải ai sau khi đăng nhập vào website timviec365.vn cũng có thể được chấp nhận hồ sơ. Vậy làm cách nào để giải quyết vấn đề khúc mắc này? Tất cả sẽ được chúng tôi giải đáp ở ngay bên dưới bạn nhé!
                        </p>
                        <p>
                            Đăng bởi: <span>Trương Văn Trắc</span>
                        </p>
                    </div>
                    <div>
                        <Carousel autoplay>
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                    </div>

                </div>
                <div>

                </div>

            </div>
            <div>

            </div>

        </div>
    )
}
export default Body