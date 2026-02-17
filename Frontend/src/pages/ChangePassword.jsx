export default function ChangePassword() {
  const [password, setPassword] = useState("");

  const submit = async () => {
    await axios.post(
      "/admin/change-password",
      { newPassword: password },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    alert("Password updated");
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Change Password
      </h2>

      <input
        type="password"
        className="w-full border p-3 mb-4 rounded"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-indigo-600 text-white py-3 rounded"
      >
        Update
      </button>
    </div>
  );
}
