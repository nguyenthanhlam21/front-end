import React, { useState } from 'react';

type Props = {};

const Supports = (props: Props) => {
  const [selectedSection, setSelectedSection] = useState<string>('terms');

  const renderContent = () => {
    switch (selectedSection) {
      case 'terms':
        return (
          <>
            <h1 className="text-3xl font-bold">Điều khoản và Điều kiện</h1>
            <p className='text-xs text-slate-400'><span className='font-medium'>Cập nhật lần cuối:</span> tháng 9 30, 2024</p>
            <p className="text-gray-700 mt-9">
              <strong><h2 className='text-lg'>1. Quyền sử dụng và truy cập website</h2></strong>
              <br></br>
              Chào mừng bạn đến với website <a className='underline text-blue-400' href="">www.website.</a> Bằng cách sử dụng website, bạn vui lòng Chấp nhận và Đồng ý tuân theo tất cả các quy định được nêu trong văn bản. Các điều khoản có thể được điều chỉnh, cập nhật bởi QA&FR tùy từng thời điểm mà không thông báo trước, vì vậy hãy kiểm tra thường xuyên để biết những thay đổi mới nhất đối với Điều Khoản Sử Dụng. Vui lòng hiểu rằng nếu bạn từ chối chấp thuận Điều Khoản Sử Dụng, bạn sẽ không thể sử dụng hoặc mua bất cứ sản phẩm nào tại website.
              <br></br>
              <br></br>
              Website chỉ dành cho mục đích sử dụng thông tin cá nhân của Quý khách trong việc tạo giao dịch mua và bán, bao gồm xem, cung cấp thông tin cho website, tải xuống thông tin sản phẩm. Bạn cũng có thể phải tuân theo Điều Khoản Sử Dụng bổ sung áp dụng cho một số phần nhất định của website. QA&FR có thể chấm dứt Điều Khoản Sử Dụng và từ chối bạn truy cập vào website bất cứ lúc nào và không cần thông báo nếu phát hiện Khách hàng không tuân thủ hoặc vi phạm các điều khoản trong Điều Khoản Sử Dụng này.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>2. Sản phẩm của QA&FR</h2></strong>
              <br></br>
              QA&FR nỗ lực để cung cấp các thông tin mô tả sản phẩm là chính xác nhất có thể. Tuy nhiên, QA&FR không đảm bảo rằng tất cả mô tả sản phẩm hoặc nội dung khác trên Website là hoàn toàn chính xác, đôi lúc chúng tôi vẫn có thể xảy ra những sai sót. Đặc biệt, về "Hướng dẫn chọn size sản phẩm" cũng như các mô tả khác trên website chỉ mang tính chất tham khảo. Tuy nhiên, QA&FR sẽ cố gắng hiển thị chính xác các thông tin về đặc tính sản phẩm, bao gồm màu sắc, chất liệu, kiểu dáng và cách chăm sóc, bảo quản sản phẩm.
              <br></br>
              <br></br>
              Cùng với đó, màu sắc hiển thị trên Website có thể khác so với màu thực tế, phụ thuộc vào thiết bị và màn hình của bạn, đồng thời còn bị ảnh hưởng bởi không gian chụp mẫu và sản phẩm so với thực tế, tùy từng thời điểm so sánh khác nhau không mang tính chất đối chiếu hoàn hảo.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>3. Tài khoản người dùng</h2></strong>
              <br></br>
              <strong><u>LƯU Ý:</u></strong><i> Phần này không áp dụng cho dữ liệu cá nhân do bạn cung cấp cho website, bao gồm tên, địa chỉ, email, số điện thoại và sở thích cá nhân. Vui lòng xem <a className='underline text-blue-400' href="">chính sách bảo bật</a> của QA&FR để biết thông tin chi tiết về việc xử lý dữ liệu cá nhân.</i>
              <br></br>
              <br></br>
              Nếu bạn phản hồi QA&FR bằng bất kỳ thông tin nào, như câu hỏi, nhận xét, đề xuất, hoặc thông tin tương tự, những nội dung này sẽ KHÔNG được coi là bí mật. Tất cả thông tin bạn gửi sẽ được xem là tài sản của QA&FR và các thông tin này sẽ chuyển nhượng cho QA&FR quyền sở hữu và lợi ích trên toàn thế giới đối với thông tin đó. QA&FR sẽ không chịu trách nhiệm về việc sử dụng hoặc tiết lộ thông tin và sẽ không có bất kỳ nghĩa vụ nào trong việc giữ bí mật những thông tin đó. Đồng thời QA&FR sẽ được tự do tái tạo, sử dụng và phân phối thông tin cho người khác mà không bị giới hạn.
              <br></br>
              <br></br>
              Ngoài ra, QA&FR sẽ được tự do sử dụng bất kỳ ý tưởng, khái niệm, bí quyết hoặc kỹ thuật nào có trong thông tin đó cho bất kỳ mục đích nào, bao gồm nhưng không giới hạn ở việc phát triển, sản xuất và tiếp thị các sản phẩm kết hợp hoặc dựa vào thông tin đó. Trừ khi QA&FR yêu cầu cụ thể, chúng tôi không yêu cầu hay mong muốn nhận bất kỳ thông tin bí mật, bí mật hoặc độc quyền hoặc tài liệu nào khác từ bạn.
              <br></br>
              <br></br>
              QA&FR sẽ không xử lý bất kỳ thông tin, đề xuất, yêu cầu, tác phẩm sáng tạo, tranh ảnh, tài liệu, thư từ, bản trình diễn, ý tưởng, bí quyết, đề xuất, khái niệm, phương pháp, hệ thống, thiết kế, bản vẽ, kế hoạch, kỹ thuật, nhận xét, những lời chỉ trích, báo cáo, đánh giá, xếp hạng, phản hồi hoặc các tài liệu khác được gửi hoặc truyền qua website theo bất kỳ cách nào, bao gồm nhưng không giới hạn ở phần “Liên hệ” dưới dạng bí mật hoặc độc quyền và có thể được chúng tôi sử dụng theo bất kỳ cách nào phù hợp với các Điều khoản này và Chính sách bảo mật của QA&FR.
              <br></br>
              <br></br>
              Việc sử dụng một số tính năng nhất định trên website có thể yêu cầu tạo tài khoản và gửi thông tin cá nhân. Chính sách thu thập và sử dụng thông tin của website được quy định trong Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. Bạn đồng ý chỉ cung cấp thông tin đúng, chính xác, hiện hành và đầy đủ.  Bạn có trách nhiệm duy trì tính bảo mật của chi tiết tài khoản của mình (bao gồm mọi mật khẩu) và bạn chấp nhận mọi trách nhiệm đối với bất kỳ và tất cả thông tin cũng như mọi hoạt động diễn ra trong tài khoản của bạn. Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn nếu chúng tôi có lý do hợp lý để tin rằng bạn đã không tuân thủ các Điều khoản này hoặc hạn chế quyền truy cập của bạn vào tất cả hoặc một phần Website theo mục Truy cập vào Website.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>4. Điều khoản bán hàng</h2></strong>
              <br></br>
              Website hiển thị một danh mục trực tuyến các sản phẩm và giá cả. Bạn có thể được phép đặt hàng để mua sản phẩm và các sản phẩm khác (“Sản phẩm”) có sẵn trên website (cho dù ở dạng đơn đặt hàng trực tiếp ở website hay mua hàng gián tiếp thông qua email, điện thoại hoặc hình thức khác được QA&FR cho phép). Tất cả các Đơn đặt hàng đều phải được QA&FR chấp nhận theo quyết định riêng của mình.
              <br></br>
              <br></br>
              Ngoài Thỏa thuận này, việc mua sản phẩm sẽ tuân theo các điều khoản hiển thị trên website và các điều khoản bổ sung liên quan đến đơn hàng. Khi bạn đặt đơn hàng, bạn đồng ý theo những điều khoản đó cho đơn hàng và tất cả sản phẩm trong đó. Nếu có xung đột giữa Thỏa thuận và Điều khoản bán hàng, thì Điều khoản bán hàng sẽ được ưu tiên chi phối cũng như kiểm soát đối với các sản phẩm được cung cấp theo đơn đặt hàng đó.
              <br></br>
              <br></br>
              Tất cả đơn đặt hàng phụ thuộc vào tính sẵn có của sản phẩm và xác nhận giá. Thời gian giao hàng có thể thay đổi tùy vào sự sẵn sàng của sản phẩm. Mọi xác nhận về thời gian vận chuyển đều có thể bị ảnh hưởng bởi chậm trễ từ dịch vụ chuyển phát hoặc sự kiện bất khả kháng và chúng tôi không chịu trách nhiệm về những chậm trễ này.
              <br></br>
              <br></br>
              Nếu sản phẩm được liệt kê ở mức giá không chính xác do lỗi (bao gồm lỗi hệ thống) xảy ra hoặc có thông tin không chính xác khi QA&FR phát hiện, QA&FR có quyền từ chối hoặc hủy bất kỳ Đơn hàng nào được đặt cho các sản phẩm đó. Cho dù Đơn hàng đã được xác nhận và thanh toán thông qua thẻ ngân hàng, tín dụng. Nếu thẻ ngân hàng, tín dụng của bạn đã bị tính phí và Đơn hàng của bạn đã bị hủy, QA&FR sẽ hoàn trả khoản tiền tương ứng với số tiền tính phí.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>5. Thanh toán</h2></strong>
              <br></br>
              Tất cả các mức giá trên website đều là giá theo Việt Nam Đồng. Bạn có thể thanh toán cho đơn hàng của mình khi nhận hàng (bằng hình thức trả tiền mặt khi nhận hàng) hoặc thông qua hình thức thanh toán trực tuyến (bằng thẻ tín dụng và thẻ ghi nợ quốc tế hoặc các phương thức cho phép khác có sẵn trên website).
              <br></br>
              <br></br>
              Các thẻ ATM, tín dụng và thẻ ghi nợ như Visa/ Mastercard/ JCB/ QRCode qua Payoo/ thanh toán mua trước trả sau Fundiin đều được chấp nhận cho việc thanh toán. Khi bạn thanh toán trực tuyến, bạn sẽ được điều hướng đến một website khác do nhà cung cấp dịch vụ cổng thanh toán độc lập sở hữu và điều hành, website này sẽ thu thập và xử lý thông tin tài chính của Bạn trên cơ sở các điều khoản và chính sách riêng của website đó.
              <br></br>
              <br></br>
              Nếu Bạn không thực hiện bất kỳ khoản thanh toán nào theo phương thức thanh toán đã chọn hoặc việc thanh toán bị hủy bỏ vì bất kỳ lý do gì, QA&FR sẽ hủy đơn đặt hàng và tạm ngừng giao hàng cho đến khi bạn đã thanh toán đầy đủ.
              <br></br>
              <br></br>
              QA&FR có quyền tạm ngưng, gián đoạn, hoặc thu hồi quyền truy cập website vì bất kỳ lý do gì nhằm nâng cấp hoặc bảo trì website. QA&FR sẽ không chịu trách nhiệm với Bạn về bất kỳ sự chậm trễ hoặc không thực hiện nghĩa vụ nào do các trường hợp bất khả kháng hoặc các lý do ngoài tầm kiểm soát của QA&FR, bao gồm thảm họa tự nhiên, chiến tranh, khủng bố, dịch bệnh, đại dịch, thiên tai, các khoản phí theo luật pháp, quy định, chính sách của chính phủ, và tình trạng thiếu hụt nguồn cung hàng hóa và dịch vụ.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>6.  Nghĩa vụ của QA&FR (bên bán)</h2></strong>
              <br></br>
              Bên cạnh các nghĩa vụ được quy định cụ thể tại Điều Khoản Sử Dụng này, QA&FR có nghĩa vụ giao hàng, chuyển hàng hóa cho Khách hàng và nhận thanh toán.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>7.  Nghĩa vụ của Khách hàng (bên mua và sử dụng)</h2></strong>
              <br></br>
              Ngoài các nghĩa vụ được quy định trong Điều Khoản Sử Dụng, bạn không được:
              <br />1. Sử dụng Website cho bất kỳ hành vi vi phạm pháp luật nào;
              <br />2. Thực hiện các hành động gây bất tiện, bất lợi hoặc tổn hại đến người dùng, bên thứ ba (nếu có) hoặc QA&FR;
              <br />3. Làm hại, lạm dụng, quấy rối tình dục, đe dọa hoặc xúc phạm người khác;
              <br />4. Bán lại, phân phối hoặc thực hiện các hành vi nhằm mua sản phẩm từ Website để thu lợi;
              <br />5. Đăng ký hoặc nắm giữ nhiều tài khoản trên Website một cách gian lận;
              <br />6. Can thiệp, làm gián đoạn hoặc cản trở hoạt động của Website hoặc QA&FR.
              <br></br>
              <br></br>
              <strong><h2 className='text-lg'>8.   Điều Khoản Chung</h2></strong>
              <br></br>
              Điều Khoản Sử dụng và bất kỳ chính sách hoặc quy tắc hoạt động nào được đăng trên website này cấu thành toàn bộ thỏa thuận và hiểu biết giữa bạn và QA&FR. Điều Khoản Sử Dụng này sẽ được chấp nhận trong các thủ tục tố tụng tư pháp hoặc hành chính dựa trên hoặc liên quan đến việc sử dụng website ở cùng mức độ và tuân theo các điều kiện giống như các tài liệu và hồ sơ kinh doanh khác được tạo và lưu giữ ban đầu ở dạng in. Bằng việc tiếp tục sử dụng website, bạn xác nhận đã đọc, hiểu, và đồng ý thực hiện, chịu sự ràng buộc của các điều khoản và điều kiện của Điều Khoản Sử dụng.
              <br></br>
              <br></br>
              Nếu bạn có bất kỳ câu hỏi nào liên quan đến Điều Khoản Sử Dụng cho website này, vui lòng liên hệ với chúng tôi thông qua phần Liên hệ để biết thêm thông tin chi tiết.
              <br></br>
            </p>
            
          </>
        );
      case 'rights':
        return (
          <>
            <h1 className="text-3xl font-bold">Quyền lợi và nghĩa vụ</h1>
          </>
        );
      case 'privacy':
        return (
          <>
            <h1 className="text-3xl font-bold">Chính sách bảo mật</h1>
          </>
        );
      case 'contact':
        return (
          <>
            <h1 className="text-3xl font-bold">Liên hệ</h1>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex mt-8 mb-10">
      {/* Sidebar menu */}
      <div className="w-64 px-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedSection('terms')}
              className={` hover:underline h-10 w-full text-left ${selectedSection === 'terms' ? 'border-r-2 border-black font-bold' : ''}`}
            >
              Điều khoản sử dụng
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('rights')}
              className={` hover:underline h-10  w-full text-left ${selectedSection === 'rights' ? 'border-r-2 border-black font-bold' : ''}`}
            >
              Quyền lợi và nghĩa vụ
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('privacy')}
              className={` hover:underline h-10 w-full text-left ${selectedSection === 'privacy' ? 'border-r-2 border-black font-bold' : ''}`}
            >
              Chính sách bảo mật
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('contact')}
              className={` hover:underline h-10 w-full text-left ${selectedSection === 'contact' ? 'border-r-2 border-black font-bold' : ''}`}
            >
              Liên hệ
            </button>
          </li>
        </ul>
      </div>
      {/* Main content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Supports;
