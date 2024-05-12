export const Input = ({ type, label, value, handler }) => {
  const verify = (ev) => {
    if (type === "file") {
      handler(ev.currentTarget.files[0]);
    } else {
      handler(ev.currentTarget.value);
    }
  };

  return (
    <div className="row mb-3">
      <label htmlFor="" className="col-4 col-form-label">{label}</label>
      <div className="col-8">
        {
          type === "file"
            ? <input type={type} onChange={ verify } className="form-control" />
            : <input type={type} value={value} onChange={ verify } className="form-control" />
        }
      </div>
    </div>
  );
};