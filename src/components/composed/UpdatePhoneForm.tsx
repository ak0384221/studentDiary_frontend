import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface UpdatePhoneFormProps {
  phoneUpdate: string;
  setPhoneUpdate: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  updateError: string;
  updateLoading: boolean;
  onUpdate: () => void;
}

export const UpdatePhoneForm = ({
  phoneUpdate,
  setPhoneUpdate,
  code,
  setCode,
  updateError,
  updateLoading,
  onUpdate,
}: UpdatePhoneFormProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Update Phone</h2>
      {updateError && (
        <div className="mb-3 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {updateError}
        </div>
      )}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            New phone
          </label>
          <Input
            value={phoneUpdate}
            onChange={(e) => setPhoneUpdate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Secret code
          </label>
          <Input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          disabled={updateLoading}
          onClick={onUpdate}
          size="md"
        >
          {updateLoading ? "⏳ Updating" : "✅ Update"}
        </Button>
      </div>
    </div>
  );
};
