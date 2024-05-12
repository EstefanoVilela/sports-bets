import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { Input } from "../components/Input";
import { InputGroup } from "../components/InputGroup"
import { Select } from "../components/Select";
import Axios from "axios";

export const AdvisorDashboard = ({ logout }) => {
  /* ========== DATA AND QUERIES ========== */
  const [channels, setChannels] = useState(null);
  const [banks, setBanks] = useState(null);

  const getChannels = async () => {
    const res = await Axios.get("http://localhost:8000/api/channels");
    setChannels(res.data);
  }

  const getBanks = async () => {
    const res = await Axios.get("http://localhost:8000/api/banks");
    setBanks(res.data);
  }

  useEffect(() => {
    getChannels();
    getBanks();
  }, []);

  const [wantedPlayerId, setWantedPlayerId] = useState("");
  const [player, setPlayer] = useState(null);
  const search = async (ev) => {
    try {
      if (wantedPlayerId === "") {
        alert("Digite la clave/id del jugador!");
        return;
      }

      const res = await Axios.get("http://localhost:8000/api/players/" + wantedPlayerId);
      setPlayer(res.data);
      setPlayerId(wantedPlayerId);
    } catch (error) {
      alert("No se encontró al jugador.");
    }
  };

  /* ========== VOUCHER MODEL ========== */
  const [amount, setAmount] = useState(0);
  const [bankId, setBankId] = useState(0);
  const [depositDate, setDepositDate] = useState("");
  const [depositTime, setDepositTime] = useState("");
  const [depositImage, setDepositImage] = useState("");

  /* ========== WALLET TOP UP MODEL ========== */
  const [playerId, setPlayerId] = useState("");
  const [channelId, setChannelId] = useState(0);

  /* ========== HELPERS ========== */
  const reInitialize = () => {
    setAmount(0);
    setBankId(0);
    setDepositDate("");
    setDepositTime("");
    setDepositImage("");
    setPlayerId("");
    setChannelId(0);
    setWantedPlayerId("");
    setPlayer(null);
  };

  const isValid = () => {
    if (channelId === 0) {
      alert("Complete los datos de la comunicación!");
      return false;
    }

    if (playerId === "") {
      alert("Complete los datos del jugador!");
      return false;
    }

    if (amount === 0 | bankId === 0 || depositDate === "" || depositTime === "" || depositImage === "") {
      alert("Complete los datos del voucher!");
      return false;
    }

    if (amount > 500) {
      alert("Las recargas solo pueden ser de hasta 500 soles");
      return false;
    }

    return true;
  }

  const prepare = () => {
    const userId = Cookies.get("userId");

    const form = new FormData();
    form.append("amount", amount);
    form.append("bank_id", bankId);
    form.append("deposit_date", depositDate);
    form.append("deposit_time", depositTime);
    form.append("deposit_image", depositImage);

    form.append("player_id", playerId);
    form.append("transacted_by", userId);
    form.append("channel_id", channelId);
    return form;
  }

  const toTopUpWallet = async () => {
    try {
      if (!isValid())
        return;

      const result = await Swal.fire({
        title: 'Confirmación',
        text: '¿Estás seguro que los datos son correctos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, realizar la recarga.',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const form = prepare();
        const res = await Axios.post(
          "http://localhost:8000/api/wallet_histories/make_top_up",
          form,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        Swal.fire('Saldo recargado!', res.data.message, 'success');
        reInitialize();
      } else {
        Swal.fire('Advertencia!', 'El saldo del jugador NO ha sido actualizado.', 'warning');
      }
    } catch (error) {
      Swal.fire('Error!', "Algo sucedió al procesar la recarga, inténtelo más tarde.", 'error');
    }
  }

  return (
    <div className="card">
      <div className="card-header text-center">
        <p className="mb-0 fw-light">Recarga de Saldos</p>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-lg-6">
            <fieldset className="p-4 mb-2 shadow-sm">
              <legend>Datos de la comunicación</legend>

              <Select label="Canal"
                optionsForSelect={channels}
                value={channelId}
                handler={setChannelId} />
            </fieldset>

            <fieldset className="p-4 mb-2 shadow-sm">
              <legend>Datos del jugador</legend>

              <InputGroup label="Clave/ID"
                value={wantedPlayerId}
                handler={setWantedPlayerId}
                textOnButton="Buscar"
                action={search} />

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <td width="35%">Nombres</td>
                      <td width="35%">Apellidos</td>
                      <td width="30%">Saldo</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      player
                        ? <tr>
                          <td>{player.first_name}</td>
                          <td>{player.last_name}</td>
                          <td>{player.wallet_balance}</td>
                        </tr>
                        : <tr><td className="text-center" colSpan={4}>Busque un jugador.</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
          <div className="col-lg-6">
            <fieldset className="p-4 shadow-sm">
              <legend>Datos del voucher</legend>

              <Input type="number" label="Monto" value={amount} handler={setAmount} />
              <Select label="Banco" optionsForSelect={banks} value={bankId} handler={setBankId} />
              <Input type="date" label="Fecha" value={depositDate} handler={setDepositDate} />
              <Input type="time" label="Hora" value={depositTime} handler={setDepositTime} />
              <Input type="file" label="Imagen" value={depositImage} handler={setDepositImage} />
            </fieldset>
          </div>
        </div>
      </div>

      <div className="card-footer text-center">
        <button onClick={toTopUpWallet} className="btn btn-primary me-2" style={{ width: "150px" }}>Confirmar</button>
        <button onClick={reInitialize} className="btn btn-danger me-2" style={{ width: "150px" }}>Cancelar</button>
        <button onClick={logout} className="btn btn-secondary" style={{ width: "150px" }}>Logout</button>
      </div>
    </div>
  )
}