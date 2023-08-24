import styles from './index.module.css'

const Giaiphap = () => {
    return (
        <div className={styles.idx_wra}>
            <div className={styles.idx_solu}>
                <div className={styles.container}>
                    <h2>Giải pháp tính lương</h2>
                    <div className={styles.idx_solu_ct}>
                        <div className={styles.idx_solu_one}>
                            <div className={styles.solu_one_img}>
                                <img src={"https://tinhluong.timviec365.vn/img/solu_three.png"} alt={"Quản lý hồ sơ nhân viên"}/>
                            </div>
                            <div className={styles.solu_one_text}>
                                <h3>
                                    Quản lý hồ sơ nhân viên
                                </h3>
                                <p>
                                    Quản lý thông tin nhân viên công ty
                                </p>

                            </div>

                        </div>
                        <div className={styles.idx_solu_tow}>
                            <div className={styles.solu_one_img}>
                                <img src={"https://tinhluong.timviec365.vn/img/solu_tow.png"} alt={"Quản lý việc chấm công"}/>
                            </div>
                            <div className={styles.solu_one_text}>
                                <h3>
                                    Quản lý việc chấm công
                                </h3>
                                <p>
                                    Quản lý thông tin chấm công nhân viên mỗi ngày
                                </p>
                            </div>
                        </div>
                        <div className={styles.idx_solu_three}>
                            <div className={styles.solu_one_img}>
                                <img alt={"Quản lý tiền lương"} src={"https://tinhluong.timviec365.vn/img/solu_one.png"}/>
                            </div>
                            <div className={styles.solu_one_text}>
                                <h3>Quản lý tiền lương</h3>
                                <p>
                                    Quản lý bảng lương nhân viên tuỳ chỉnh
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div className={styles.idx_step_tow}>
                <div className={styles.container}>
                    <div className={styles.step_tow_img_top}>
                        <picture>
                            <source media={"(max-width:768px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_mb_min.png"}/>
                        </picture>
                        <picture>
                            <source media={"(max-width:1024px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_mb.png"}/>
                        </picture>
                        <source media={"(max-width:1366px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_tl.png"}/>
                        <img src={"https://tinhluong.timviec365.vn/img/step_tow.png"} alt={""}/>
                    </div>
                    <div className={styles.step_tow_text}>
                        <h3>
                            Bước 1: Tải và cài đặt app Chấm công 365
                        </h3>
                        <p>
                            Để có cơ sở dữ liệu phục vụ công việc tính lương, trước hết bạn cần tải app chấm công 365 bằng cách truy cập link
                            <a style={{color: "blue"}}> https://chamcong.timviec365.vn/download.html</a> hoặc truy cập CH play/ App store tìm kiếm Chấm công 365 và tải về.
                        </p>
                    </div>
                    <div className={styles.step_tow_img}>
                        <picture>
                            <source media={"(max-width:768px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_mb_min.png"}/>
                        </picture>
                        <picture>
                            <source media={"(max-width:1024px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_mb.png"}/>
                        </picture>
                        <source media={"(max-width:1366px)"} srcSet={"https://tinhluong.timviec365.vn/img/step_tow_tl.png"}/>
                        <img src={"https://tinhluong.timviec365.vn/img/step_tow.png"} alt={""}/>
                    </div>

                </div>

            </div>
            <div className={styles.idx_step_one}>
                <div className={styles.container}>
                    <div className={styles.step_one_img}>
                        <img src={"https://tinhluong.timviec365.vn/img/step_one.png"} alt={"Đăng ký tài khoản"} className={styles.lazyloaded}/>
                    </div>
                    <div className={styles.step_one_text}>
                        <h3>
                            Bước 2: Đăng ký tài khoản
                        </h3>
                        <p>
                            Bạn hãy truy cập website hoặc app Chấm công 365 để đăng ký tài khoản. Đối với tài khoản công ty, chọn mục "Công ty" và điền đầy đủ thông tin đăng ký tài khoản. Lưu ý đối với tạo tài khoản nhân viên có 2 cách để tạo tài khoản:
                        </p>
                        <p>
                            Cách 1: Nhân viên tự đăng ký tài khoản bằng cách nhập ID công ty do nhân sự cung cấp và điền đầy đủ thông tin đăng ký
                            <br/>
                            Cách 2: Công ty tạo tài khoản cho nhân viên bằng cách đăng nhập tài khoản công ty và thêm mới tài khoản cho nhân viên.
                        </p>
                        <p>
                            Sau khi điền đầy đủ thông tin, hệ thống sẽ gửi về email đăng ký mã OTP để xác thực tài khoản, người dùng nhập mã OTP để có thể bắt đầu sử dụng.
                        </p>
                        <p>
                            Công ty và nhân viên đăng nhập bằng tài khoản đó trên các phần mềm của hệ sinh thái 365 để quản lý doanh nghiệp, trong đó có phần mềm tính lương 365 để thiết lập, quản lý và theo dõi công lương.
                        </p>

                    </div>

                </div>
            </div>
            <div className={styles.idx_step_three}>
                <div className={styles.container}>
                    <div className={styles.step_one_img}>
                        <img src={"https://tinhluong.timviec365.vn/img/step_three.png"} alt={"Thiết lập dữ liệu"}/>
                    </div>
                    <div className={styles.step_one_text_box_nd_hide_text}>
                        <h3>
                            Bước 3: Thiết lập dữ liệu
                        </h3>
                        <p>
                            Sau khi hoàn tất quá trình đăng ký, bạn đăng nhập hệ thống để thiết lập các trường nhằm mục đích hỗ trợ hệ thống tính lương chính xác nhất.
                        </p>
                        <ul>
                            <li>
                                <p>Danh sách nhân viên: toàn bộ nhân viên trong công ty đã đăng ký tài khoản trên hệ thống. Nhân sự thao tác nhập lương cơ bản, lương tính bảo hiểm (nếu không tính bảo hiểm theo lương cơ bản), Hợp đồng và phần trăm lương tương ứng, số người phụ thuộc của từng nhân viên để hỗ trợ tính thuế. Tại đây nhân sự cũng có thể lựa chọn loại thuế và bảo hiểm cho nhân viên.</p>
                            </li>
                            <li>
                                <p>
                                    Đề xuất: theo dõi danh sách các đề xuất (xin nghỉ, xin đổi ca, tạm ứng,...) của nhân viên và tình trạng phê duyệt.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Thưởng phạt: cập nhật các mức thưởng phạt của nhân viên trong chu kỳ tính lương tương ứng, đây là các mức mà chưa được thiết lập trên hệ thống tức hệ thống không có cơ sở căn cứ để tính ra, vậy nên nhân sự sẽ tự nhập bằng tay vào hệ thống. Khi nhập thưởng phạt, lưu ý chọn chu kỳ được hưởng mức thưởng hay bị phạt để việc tính lương không xảy ra sai sót hay chênh lệch.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Nhóm làm việc: đây là mục hỗ trợ nhân sự trong quá trình thiết lập các điều kiện tính lương khác. Ở đây, nhân sự chọn tạo mới để tạo nhóm, điền tên nhóm, mô tả nhóm (nếu cần) và lưu. Sau đó sẽ xuất hiện ô nhóm tương ứng và thêm nhân viên vào nhóm đó. Phần nhóm làm việc này mỗi nhân viên có thể tham gia vào nhiều nhóm khác nhau để phù hợp với mỗi trường tính năng thiết lập sau đó.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Thuế: thiết lập chính sách thuế theo quy định của nhà nước và doanh nghiệp. Phần mềm thiết lập sẵn 2 phương thức tính thuế cho doanh nghiệp: thuế tính theo phần trăm cố định, thuế được tính theo lũy tiến. Tại 2 mục này, nhân sự chỉ cần thêm nhân viên vào đúng phương thức tính mà doanh nghiệp đang áp dụng và phần mềm sẽ tự động tính mức thuế cần đóng của nhân viên trong chu kỳ tính lương. Ngoài hai phương thức trên, doanh nghiệp có thể tạo phương thức tính thuế khác tùy theo tình hình lao động của doanh nghiệp.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Bảo hiểm: phần mềm thiết lập sẵn ba loại bảo hiểm cố định cho doanh nghiệp, ngoài ra doanh nghiệp có thể chủ động tạo thêm loại bảo hiểm khác tùy theo quy định doanh nghiệp. Với loại bảo hiểm “Nhập tiền bảo hiểm”, nhân sự chỉ cần thêm nhân viên vào loại này và nhập số tiền tương ứng với nhân viên đó, ngoài ra để thao tác nhanh hơn, nhân sự có thể tải file excel mẫu về và điền thông tin nhân viên, số tiền bảo hiểm tương ứng với nhân viên đó và đẩy file lên hệ thống. Hai loại Bảo hiểm XH tính theo lương cơ bản (mức lương cơ bản mà nhân viên được hưởng) và bảo hiểm XH tính theo lương nhập vào (theo mức lương mà doanh nghiệp đóng bảo hiểm cho nhân viên), nhân sự chỉ cần thêm danh sách nhân viên vào để tính tự động số tiền bảo hiểm tương ứng, tùy từng doanh nghiệp lựa chọn tính theo phương thức nào.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Phúc lợi: Phúc lợi và Phụ cấp là hai trong số các chế độ đãi ngộ của doanh nghiệp. Phúc lợi tính theo tháng, phụ cấp tính theo ca làm việc hoặc theo số ngày công đi làm của nhân viên. Nhân sự tạo mới phúc lợi/ phụ cấp, nhập số tiền tương ứng cho loại phúc lợi/ phụ cấp sau đó thêm nhân viên được hưởng tương ứng, hệ thống sẽ tự động tính theo chu kỳ tính lương.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Hoa hồng và tạm ứng:
                                </p>
                            </li>
                        </ul>
                        <p>
                            Với mục cài đặt hoa hồng cho nhân viên, hệ thống thiết lập sẵn 5 loại hoa hồng phù hợp với đa số các doanh nghiệp hiện nay đang sử dụng để tính hoa hồng cho nhân viên. Với mục này, nếu doanh nghiệp sử dụng mục nào chỉ cần bật ON tại mục đó hoặc OFF nếu không cần sử dụng đến, đồng thời tại mỗi loại hoa hồng sẽ có hai chức năng chính, thiết lập cơ chế tính hoa hồng và nhập các thông số tương ứng để tính hoa hồng (doanh thu, nhân viên, …).
                        </p>
                        <ul>
                            <li>
                                <p>
                                    Hoa hồng tiền: là loại hoa hồng người dùng tự nhập vào theo hai cách: bằng file excel hoặc lựa chọn nhân viên và nhập số tiền hoa hồng tương ứng.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Hoa hồng doanh thu: hoa hồng dựa trên doanh thu mà nhân viên mang lại, doanh thu cá nhân và doanh thu nhóm. Thiết lập mức doanh thu và phần trăm hoa hồng tương ứng với mức doanh thu đó. Sau đó nhân sự nhập doanh thu của nhân viên vào hệ thống và lựa chọn chu kỳ tính hoa hồng tương ứng với doanh thu đó. Hoặc nhập doanh thu theo nhóm nhân viên, mỗi nhân viên trong nhóm sẽ được hưởng phần trăm mức hoa hồng khác nhau và tổng phần trăm của tất cả nhân viên là 100%.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Hoa hồng lợi nhuận: hoa hồng = doanh thu - chi phí. Mức chi phí của từng sản phẩm sẽ được thiết lập tại mục cài đặt của hoa hồng lợi nhuận, sau đó nhân sự nhập mức doanh thu của từng nhân viên với từng sản phẩm. Tương tự với hoa hồng doanh thu, hoa hồng lợi nhuận cũng có mức nhập theo nhóm, và trong mỗi nhóm nhân viên sẽ được hưởng mức hoa hồng khi nhân sự cài đặt phần trăm cho mỗi nhân viên trong nhóm được hưởng bao nhiêu phần trăm trong tổng số hoa hồng. Lưu ý rằng tổng số phần trăm của các thành viên trong nhóm là 100%.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Hoa hồng lệ phí vị trí: là mức hoa hồng được thiết lập sẵn cho từng loại sản phẩm. Nhân sự vào phần cài đặt của loại hoa hồng này và thiết lập mức hoa hồng cố định cho từng sản phẩm. Khi nhân viên phát sinh doanh thu hoặc cuối tháng, nhân sự vào nhập số lượng bán hàng của từng sản phẩm mà nhân viên bán trong chu kỳ tính lương tương ứng.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Hoa hồng kế hoạch: mức hoa hồng này, nhân sự sẽ thiết lập mức hoa hồng mà nhân viên được hưởng khi hoàn thành kế hoạch hay không hoàn thành kế hoạch (đạt KPI, không đạt KPI). Thiết lập mức hoa hồng được hưởng, sau đó tương ứng với chu kỳ xét kế hoạch, nhân sự nhập nhân viên thực hiện kế hoạch và tình trạng đạt KPI hay không đạt KPI như vậy hệ thống sẽ tự động tính ra được hoa hồng kế hoạch của nhân viên được thêm vào.
                                </p>
                            </li>
                        </ul>
                        <p>
                            Phần tạm ứng của tinhluong365 thể hiện danh sách các đề xuất tạm ứng của nhân viên đã tạo và tình trạng phê duyệt đề xuất đó. Nếu đề xuất tạm ứng đã được phê duyệt, mức tạm ứng đó sẽ được trừ vào bảng lương của nhân viên tương ứng với chu kỳ tính lương đó (tức tương ứng với tháng tạo đề xuất).
                        </p>
                        <ul>
                            <li>
                                <p>
                                    Nghỉ phép:
                                </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>
                                    Chính sách nghỉ phép: hệ thống thiết lập sẵn 2 chính sách nghỉ phép có lương và nghỉ phép không lương.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Theo dõi nghỉ phép: thông qua việc tạo đề xuất xin nghỉ của nhân viên, thống kê và theo dõi tình trạng xin nghỉ của toàn bộ nhân viên theo chu kỳ tháng tính lương.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Cài đặt phạt nghỉ không đúng quy định: ở mục này nhân sự sẽ thiết lập các mức phạt với từng nhóm đối tượng theo quy định của công ty khi nhân viên nghỉ sai quy định (đề xuất nghỉ phép không được duyệt, quá hạn nhưng ngày xin nghỉ không chấm công đi làm). Tại mục theo dõi nghỉ phép sẽ thể hiện rõ số tiền phạt cho từng đơn xin nghỉ.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Đi muộn về sớm: danh sách thống kê toàn bộ tình hình chấm công muộn hay chấm công về sớm của nhân viên từ app chấm công 365.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Cài đặt đi muộn về sớm: thiết lập mức phạt (phạt tiền lương/ phạt công) đối với từng nhóm nhân viên trong các khoảng thời gian chấm công khác nhau (chấm công vào- check in, chấm công về - check out).
                                </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>
                                    Nghỉ lễ: thao tác tạo mới kỳ nghỉ lễ, lựa chọn ngày nghỉ lễ (Lưu ý chỉ lựa chọn ngày nghỉ lễ trong cùng 1 tháng, nếu kỳ nghỉ lễ thuộc hai tháng khác nhau thì nhân sự thiết lập trên hai ô nghỉ lễ). Sau đó nhập thưởng nhân viên trong kỳ nghỉ lễ đó (thưởng theo số công/ thưởng tiền lương).
                                </p>
                            </li>
                            <li>
                                <p>
                                    Lịch làm việc: tại mục này sẽ thể hiện các lịch làm việc đã được thiết lập trên app chấm công 365. Nhân sự bổ sung nhân viên vào lịch làm việc tương ứng với nhân viên đó. Lịch làm việc nhằm mục đích thể hiện đúng ca làm việc của mỗi nhân viên trong ngày và tháng.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Biểu mẫu đề xuất: hệ thống thiết lập ba mẫu đề xuất mặc định (mẫu đơn xin nghỉ, mẫu đơn xin đổi ca, mẫu đơn tạm ứng), ngoài ra nhân sự tự tạo mẫu đơn mới theo mẫu chung để phù hợp với quy định của doanh nghiệp. Doanh nghiệp sử dụng mẫu nào thì bật ON đối với mẫu đó, ngược lại chuyển trạng thái mẫu đó sang OFF. Ngoài ra, đối với các mẫu đơn nhân sự cần thiết lập kiểu kiểm duyệt (kiểm duyệt đồng thời- một trong số những người được chọn để duyệt phê duyệt; kiểm duyệt lần lượt- tất cả những người được chọn khi tạo đơn đều phải kiểm duyệt), người duyệt đơn và thời gian hiệu lực của mẫu đơn đó.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Phân quyền: tại mục này phân quyền sử dụng cho nhân viên trên phần mềm (Owner, admin, nhân viên)
                                </p>
                            </li>
                            <li>
                                <p>
                                    Cài đặt tùy chỉnh: thể hiện toàn bộ các công thức đã thiết lập trên hệ thống
                                </p>
                            </li>
                        </ul>
                    </div>
                    <span className={styles.more_ct}>+ Xem Thêm</span>

                </div>

            </div>
            <div className={styles.idx_step_four}>
                <div className={styles.container}>
                    <div className={styles.step_tow_img_top}>
                        <img src={"https://tinhluong.timviec365.vn/img/load.gif"} alt={"Bảng lương"}/>
                    </div>
                    <div className={styles.step_tow_text}>
                        <div className={styles.box_nd_hide_text}>
                            <h3>
                                Bước 4: Bảng lương
                            </h3>
                            <p>
                                Theo dõi lương nhân viên theo chu kỳ tính lương (theo tháng). Bảng lương sẽ bao gồm các trường mà nhân sự đã thiết lập trên hệ thống:
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        Lương cơ bản
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Công chuẩn
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Công thực
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Lương cơ bản thực (mức lương cơ bản theo số ngày công thực đi làm)
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Lương đóng bảo hiểm
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Đi muộn/ về sớm: tổng mức phạt của nhân viên khi đi muộn, về sớm. Nếu trường hợp trừ công thì sẽ trừ thẳng vào số công thực
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Hoa hồng
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Thưởng
                                    </p>
                                </li>
                                <li>
                                    <p>Phạt</p>
                                </li>
                                <li>
                                    <p>
                                        Phạt nghỉ
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Phúc lợi
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Phụ cấp
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Bảo hiểm
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Các khoản tiền khác
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Tổng lương
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Thuế
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Tổng lương thực nhận
                                    </p>
                                </li>

                            </ul>

                        </div>
                        <span className={styles.more_ct}>
                        + Xem Thêm
                    </span>
                    </div>
                    <div className={styles.step_tow_img}>
                        <img src={"https://tinhluong.timviec365.vn/img/step_four.png"} alt={"Bảng lương"}/>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default Giaiphap;