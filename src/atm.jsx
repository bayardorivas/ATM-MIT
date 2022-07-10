const ATMDeposit = ({ onChange, isDeposit, isValid, amount }) => {
  const choice = ["Deposit", "Cash Back"];

  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <>
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        min="1"
        value={amount}
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        disabled={!isValid}
        width="200"
        value="Submit"
        id="submit-input"
      ></input>
    </>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [transactionFlag, setTransactionFlag] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  let status = `Account Balance $ ${totalState} `;

  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    setAmount(event.target.value);
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
    } else if (
      atmMode === "Cash Back" &&
      Number(event.target.value) > totalState
    ) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setAmount("");
    setValidTransaction(false);
  };

  const handleModeSelect = (event) => {
    setAmount("");
    setAtmMode(event.target.value);

    event.target.value !== ""
      ? setTransactionFlag(true)
      : setTransactionFlag(false);

    switch (event.target.value) {
      case "Deposit":
        setIsDeposit(true);
        break;
      case "Cash Back":
        setIsDeposit(false);
        break;
      default:
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>

      {transactionFlag && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
          amount={amount}
        ></ATMDeposit>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
