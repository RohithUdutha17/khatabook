<div style={item_card}  className='customers' key={item._id}>
                                    <div style={itemsStyle} >
                                        <h1>{item.item_name}</h1>
                                        <h1>{item.quantity}</h1>
                                        <h1>₹{item.price}</h1>
                                    </div>
                                    <div style={itemsStyle} >
                                    <h1>{item.date.toString().slice(0,10)}</h1>    
                                    <h1>{item.time}</h1>
                                    </div>
                                </div>




<div style={todayKhataStyle}  className='customers' key={item._id}>
                                        <h1>{item.customer_name}</h1>
                                    <div style={featuresStyle} >
                                        <h1>{item.item_name}</h1>
                                        <h1>{item.quantity}</h1>
                                        <h1>₹{item.price}</h1>
                                    </div>
                                    <h1>{item.date.toString().slice(0,10)}</h1>    
                                </div>