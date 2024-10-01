import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { formatCurrency } from "../utilities/formateCurrency";

// Define custom font (optional if needed)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "https://path-to-your-roboto-font.ttf", fontWeight: "normal" },
//     { src: "https://path-to-your-roboto-bold.ttf", fontWeight: "bold" },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  date: {
    position: "absolute",
    top: 10,
    right: 30,
    fontSize: 10,
  },
  companyDetails: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  tableColHeader: {
    width: "50%",
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 6,
  },
  tableCol: {
    width: "50%",
    fontSize: 12,
    paddingVertical: 6,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    fontSize: 12,
    textAlign: "left",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
  },
});

const OrderPDF = ({ orderData, transactionID, userStore }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image style={styles.logo} src="https://i.ibb.co/6FL29hb/logo.png" />
          <Text style={styles.companyDetails}>
            52, New Eskaton Road, TMC Bhaban, 6th Floor, Dhaka, Bangladesh
          </Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Order Confirmation</Text>

        {/* Order Details */}
        <Text style={styles.sectionTitle}>Order Information:</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Name</Text>
            <Text style={styles.tableCol}>{userStore.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Email</Text>
            <Text style={styles.tableCol}>{userStore.email}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Order ID</Text>
            <Text style={styles.tableCol}>{orderData._id}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Total Amount</Text>
            <Text style={styles.tableCol}>
              {formatCurrency(orderData.amountTotal.$numberDecimal)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Shipping Cost</Text>
            <Text style={styles.tableCol}>
              {formatCurrency(orderData.amountShipping.$numberDecimal)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Shipping Address</Text>
            <Text style={styles.tableCol}>{orderData.address}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Mobile</Text>
            <Text style={styles.tableCol}>(+880) {orderData.mobile}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your purchase! For any queries, please contact us at
          support@yourcompany.com.
        </Text>
      </Page>
    </Document>
  );
};

export default OrderPDF;
