import Axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const PlayerHistory = ({ logout }) => {
  const [walletTopUps, setWalletTopUps] = useState([]);
  const getWalletHistories = async () => {
    const userId = Cookies.get("userId");
    const res = await Axios.get("http://localhost:8000/api/wallet_histories/top_ups/"+userId);
    setWalletTopUps(res.data);
  };

  useEffect(() => {
    getWalletHistories();
  }, []);

  const setFormat = (raw) => {
    const date = new Date(raw);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      // second: 'numeric' 
    };
    return date.toLocaleString('es-ES', options);
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <p className="mb-0 fw-light">Mis recargas</p>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <td width="10%">MONTO</td>
                <td width="20%">BANCO</td>
                <td width="20%">GESTIONADO POR</td>
                <td width="10%">CANAL</td>
                <td width="20%">REGISTRADO A LAS</td>
                <td width="20%">IMAGEN</td>
              </tr>
            </thead>
            <tbody>
              {
                walletTopUps.length > 0
                ? walletTopUps.map((wallet) => (
                  <tr key={ wallet.id }>
                    <td>{ wallet.amount }</td>
                    <td>{ wallet.bank_name }</td>
                    <td>{ wallet.user_name }</td>
                    <td>{ wallet.channel_name }</td>
                    <td>{ setFormat(wallet.created_at) }</td>
                    <td className="text-center">
                      <img src={ wallet.deposit_image_path } className="w-75" />
                    </td>
                  </tr>
                ))
                : <tr key="asdasd">
                    <td className="text-center" colSpan={ 6 }>No hay recargas.</td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer text-center">
        <button onClick={logout} className="btn btn-secondary" style={{ width: "150px" }}>Logout</button>
      </div>
    </div>
  );
}