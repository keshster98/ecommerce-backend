const { createHmac } = require("crypto");

const Order = require("../models/order");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // verify the x-signature
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = createHmac("sha256", process.env.BILLPLZ_XSIGNATURE_KEY)
    .update(billplz_string)
    .digest("hex");

  // compare the x-signature we created with billplz x-signature
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid");
  } else {
    // if x-signature is match, then we update the order

    // find the order using the billplz_id
    const selectedOrder = await Order.findOne({ billplz_id: billplz_id });

    // check if order exists
    if (!selectedOrder) {
      throw new Error("Order not found");
    } else {
      // if order is found, update the order
      // if billplz_paid is equal to true, then payment is successful
      if (billplz_paid === "true") {
        selectedOrder.status = "paid";
        selectedOrder.paid_at = billplz_paid_at;
      } else {
        selectedOrder.status = "failed";
      }

      // save the order to update
      await selectedOrder.save();
      return selectedOrder;
    }
  }
};

module.exports = {
  verifyPayment,
};
