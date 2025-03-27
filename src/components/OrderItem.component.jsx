
const OrderItem = ({data}) =>(
    <div className="order-item">
       <h2>Order On: {data.createdAt.toDate().toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
        })}</h2>


        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {data.items.map(({productName, quantity, productPrice}) => (
                    <tr>
                        <td>{productName}</td>
                        <td>{productPrice}</td>
                        <td>{quantity}</td>
                        <td>&#8377; {quantity * productPrice}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr >
                    <td colSpan={3}></td>
                    <td>&#8377; {data.items.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0)}</td>
                </tr>
            </tfoot>
        </table>
    </div>
);

export default OrderItem;