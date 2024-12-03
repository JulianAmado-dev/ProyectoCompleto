const db = require("../config/config");

const Empleado = {};

/*
Estados de los productos en la db
1 = En proceso
2 = Confirmado
3 = Pendiente para alistar
4 = Pendiente para entregar
5 = Entregado
6 = Cancelado
*/ 

Empleado.verPedidosBodega = (pedido, result) => {
  const sql = "SELECT * FROM productos_pedidos WHERE codEstado = 3 AND codPedido = ?";

  db.query(
    sql,
    [pedido.codEstado, pedido.codPedido],

    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

Empleado.verPedidosEntrega = (pedido, result) => {
  const sql = "SELECT * FROM pedidos WHERE codEstado = 4";

  db.query(
    sql,
    [pedido.codEstado],

    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

Empleado.mandarParaEntrega = (pedido, result) => {
  const sql = "SELECT * FROM Pedidos WHERE codPedido = ? AND codEstado = 3";
  db.query(sql, [pedido.codPedido], (err, res) => {
    if (err) {
      console.log("error aqui");
      result(err, null);
    } else {
      console.log("datos revisados");
      const sql = "UPDATE Pedidos SET codEstado = 4 WHERE codPedido = ?";
      db.query(sql, [pedido.codEstado, pedido.codPedido], (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, {
            message: "Estado del pedido Actualizados" + res.showdata,
          });
        }
      });
    }
  });
};

Empleado.entregarPedido = (pedido, result) => {
  const sql = "SELECT * FROM Pedidos WHERE codPedido = ? AND codEstado = 4";
  db.query(sql, [pedido.codPedido], (err, res) => {
    if (err) {
      console.log("error aqui");
      result(err, null);
    } else {
      console.log("datos revisados");
      const sql = "UPDATE Pedidos SET codEstado = 5 WHERE codPedido = ?";
      db.query(sql, [pedido.codEstado, pedido.codPedido], (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, {
            message: "Estado del pedido Actualizados" + res.showdata,
          });
        }
      });
    }
  });
};

module.exports = Empleado;
