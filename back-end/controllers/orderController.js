// controllers/userController.js
const db = require('../config/db');

exports.getAllOrderBySPK = async (req, res) => {
    try {
        const sqlOrder = `SELECT a.delivery_no AS order_no, null AS booking_code,
                            a.delivery_no AS if_no, NULL AS remarks, b.cust_id AS "account", b.cust_name AS "name",
                            NULL AS pic, d.truck_no, d.driver_name,
                            case when c.date_loading = '0000-00-00' then NULL ELSE c.date_loading END AS loading_date, 
                            a.weight, NULL AS biaya_kirim,
                            a.deliv_date AS actual_delivery, d.truck_size AS truck_type, d.driver_tlpn, c.date_unloading,
                            c.total_cbm, d.order_status, c.order_id AS document_list
                            FROM list_do_part a
                            INNER JOIN customer b ON a.ship_to = b.cust_id
                            INNER JOIN order_d c ON a.delivery_no = c.delivery_no
                            INNER JOIN order_h d ON c.order_id = d.order_id
                            WHERE a.deliv_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
                            ORDER BY a.delivery_no DESC`;
        const [results] = await db.query(sqlOrder);
        let orders = {};

        results.forEach(item => {
            if (!orders[item.order_id]) {
                item.detail = []
                orders[item.order_id] = item
            }

            orders[item.order_id].detail.push({
                order_id: item.order_id,
                delivery_no: item.delivery_no,
                ship_to: item.ship_to,
                cust_name: item.cust_name
            })
        });


        res.json({ data: Object.values(orders) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrderByDelivery = async (req, res) => {

    const { orderNumber } = req.query;
    let params = {};

    try {
        let sqlOrder = `SELECT * FROM (SELECT DISTINCT a.delivery_no AS order_no, null AS booking_code,
                            a.delivery_no AS if_no, NULL AS remarks, b.cust_id AS "account", b.cust_name AS "name",
                            NULL AS pic, d.truck_no, d.driver_name, c.date_loading AS loading_date, a.weight, NULL AS biaya_kirim,
                            a.deliv_date AS actual_delivery, d.truck_size AS truck_type, d.driver_tlpn, c.date_unloading,
                            c.total_cbm, d.order_status, c.order_id AS document_list
                            FROM list_do_part a
                            INNER JOIN customer b ON a.ship_to = b.cust_id
                            INNER JOIN order_d c ON a.delivery_no = c.delivery_no
                            INNER JOIN order_h d ON c.order_id = d.order_id
                            WHERE a.deliv_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
                            ORDER BY a.delivery_no DESC)s`;
        const queryParams = [];
        if (orderNumber) {
            sqlOrder += ` WHERE s.order_no = ?`;
            queryParams.push(orderNumber);
        }

        const [results] = await db.query(sqlOrder, queryParams);

        res.json({
            status: true,
            message: "success",
            data: results
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
