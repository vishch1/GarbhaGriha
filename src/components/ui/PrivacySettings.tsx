import { usePrivacy } from "../context/PrivacyContext";

export default function PrivacySettings() {
  const { localOnly, toggleLocalOnly } = usePrivacy();

  return (
    <div className="p-4 border rounded-md bg-card/50 backdrop-blur-sm">
      <h2 className="font-semibold mb-2">Privacy Controls</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={localOnly}
          onChange={toggleLocalOnly}
        />
        Local-only Mode (don’t send data to server)
      </label>
    </div>
  );
}
