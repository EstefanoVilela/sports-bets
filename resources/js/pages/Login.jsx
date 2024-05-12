import Axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const Login = ({ signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = async () => {
    try {
      if (email === "" || password === "") {
        alert("Complete los datos del Login");
        return;
      }
  
      const form = new FormData();
      form.set("email", email);
      form.set("password", password);
  
      const res = await Axios.post("http://localhost:8000/api/sessions/store", form);
      Swal.fire('Bienvenido!', res.data.message, 'success');

      signIn(res.data.user);
    } catch (error) {
      console.log(error.message);
      Swal.fire('Error!', 'Revise sus credenciales e inténtelo de nuevo.', 'error');
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <div className="card">

          <div className="card-header">
            <p className="mb-0 text-center fw-light">Login</p>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input type="text" onChange={ (ev) => setEmail(ev.currentTarget.value) } className="form-control" placeholder="Username" />
            </div>
            <div className="mb-3">
              <input type="password" onChange={ (ev) => setPassword(ev.currentTarget.value) } className="form-control" placeholder="Password" />
            </div>
          </div>
          <div className="card-footer">
            <button onClick={ validate } className="btn btn-primary w-100">Ingresar</button>
          </div>

        </div>
      </div>
    </div>
  );
}