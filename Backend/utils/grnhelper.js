function calculateReceiptStatus(pr) {
  const totalReceived = pr.grns.reduce(
    (sum, g) => sum + g.receivedQty,
    0
  );

  if (totalReceived === 0) {
    pr.status = "PAYMENT_COMPLETED";
  } else if (totalReceived < pr.quantity) {
    pr.status = "RECEIVING_IN_PROGRESS";
  } else {
    pr.status = "FULLY_RECEIVED";
  }

  return totalReceived;
}

module.exports = calculateReceiptStatus;
