import Footer from "../component/Footer.jsx";
import Navbar from "../component/Navbar.jsx"

const ShippingPolicy=()=>{
    return <>
    <Navbar />
    <div className="shipping">
        <h1 className="shipping-h1">Shipping:</h1>
        <ul className="shipping-ul">
            <li className="shipping-li">
            <span className="shipping-span">Shipping Time:</span> &nbsp; Orders are usually processed and shipped within 48 hours. Please note personalised items will take longer to process. If your order has both personalised and non-personalised items, the order will be split, and the non-personalised items will be delivered beforehand.
            </li>
            <li className="shipping-li">
            <span className="shipping-span">Shipping Charges:</span> &nbsp; We charge Rs.70 for orders across India. Please note that we do not offer free shipping on international orders and returns.
            </li>
            <li className="shipping-li">
            <span className="shipping-span">Tracking:</span> &nbsp; You will receive tracking details over WhatsApp, email and SMS, once the order is shipped.
            </li>
        </ul>

        <h1 className="shipping-p">Return Policy</h1>
        <ul className="shipping-ul">
            <li className="shipping-li">We offer a 7-day return policy for all unused, no questions asked. However, please note that the 7-day return does not apply to used and suspicious products. Miss Cheesecake reserves the right to process refunds after checking the returned items.. Any shipping charges (if paid) at the time of placing the order are non refundable in case of returns</li>
            <li className="shipping-li">In case of missing items in return orders, i.e., where the customer claims to have returned multiple products but actual pickup doesn't include all said items, the company has a right to deduct an amount up to the full MRP of the missing product from the refund amount.</li>
            <li className="shipping-li">All orders from out of Indian territory are non-returnable.</li>
        </ul>

        <h1 className="shipping-h1">Refund Policy:</h1>
        <p className="shipping-p"> We offer refund / exchange within first 6 days from the date of your purchase. If 6 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged , (iv) Refund will take 7-10 business days to reflect refund in your account.
You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.</p>

<h3 className="shipping-h3">Replacement & Exchange:</h3>
        <p className="shipping-p">You can also avail replacement or exchange of your order as per your requirements. The conditions remain the same as those applicable to returns. The replacement will only be shipped after the initial return has been delivered.</p>
        <h3 className="shipping-h3">Return Process</h3>
        <ul className="shipping-ul">
            <li className="shipping-li">You can reach out to our Customer Support team to return your order, they’ll guide you through the process. Mainly you have to return your order by yourself. You have to pack the parcel as it was received to you and have to make a video during packing all articles and then send it to address mentioned below. No shipping charges will be refundable that costs you for return your order. </li>
            <li className="shipping-li">All orders from out of Indian territory are non-refundable.</li>
            <li className="shipping-li">In the unlikely event that you receive an empty parcel or a missing product, we would request you to reach out to our customer support team for assistance within 48 hours of the package being delivered. We will be requiring a 360-degree unpacking video of the parcel for us to process the request further. Please note that insufficient evidence or visible signs of tampering with the packet may result in your claim not being honoured. In all such cases, the brand reserves the right to take the final decision.</li>
        </ul>
    </div>
    <Footer />
    </>
}

export default ShippingPolicy;