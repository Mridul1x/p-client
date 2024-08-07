import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatCurrency } from "../utilities/formateCurrency";

// Define styles using StyleSheet
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
    marginBottom: 20,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  date: {
    position: "absolute",
    top: 10,
    right: 30,
    fontSize: 8,
  },
  companyDetails: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
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
    marginBottom: 10,
  },
});

const OrderPDF = ({ orderData, transactionID }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="https://i.ibb.co/6FL29hb/logo.png" />
          <Text style={styles.companyDetails}>
            52, New Eskaton Road, TMC Bhaban, 6th Floor, Dhaka, Bangladesh.
          </Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.tableCellHeader}>
          Transaction ID: {transactionID}
        </Text>
        <View style={styles.divider} />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Order ID:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{orderData._id}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Total Amount:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatCurrency(orderData.amountTotal.$numberDecimal)}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Shipping Cost:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatCurrency(orderData.amountShipping.$numberDecimal)}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Address:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{orderData.address}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Mobile:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>(+880) {orderData.mobile}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
