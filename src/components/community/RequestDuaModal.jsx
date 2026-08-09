import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { duaCategories, DUA_REQUEST_MAX_LENGTH } from "@/data/communityData";

const EMPTY_FORM = { name: "", anonymous: true, category: "General", request: "" };

export default function RequestDuaModal({ open, onOpenChange, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const canSubmit = form.request.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      name: form.anonymous ? null : form.name.trim() || null,
      gender: "brother",
      category: form.category,
      request: form.request.trim().slice(0, DUA_REQUEST_MAX_LENGTH),
    });
    setForm(EMPTY_FORM);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-primary">Request a Dua</DialogTitle>
          <DialogDescription>
            Share what's on your heart. The community will make dua for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="anonymous"
              checked={form.anonymous}
              onCheckedChange={(checked) => setForm((f) => ({ ...f, anonymous: !!checked }))}
            />
            <label htmlFor="anonymous" className="text-sm text-foreground cursor-pointer">
              Post anonymously
            </label>
          </div>

          {!form.anonymous && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Your Name</label>
              <Input
                placeholder="e.g. Ahmed K."
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                maxLength={60}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category</label>
            <Select
              value={form.category}
              onValueChange={(value) => setForm((f) => ({ ...f, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {duaCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Your Dua Request</label>
            <Textarea
              placeholder="Share what you'd like the community to make dua for..."
              value={form.request}
              onChange={(e) => setForm((f) => ({ ...f, request: e.target.value }))}
              maxLength={DUA_REQUEST_MAX_LENGTH}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.request.length}/{DUA_REQUEST_MAX_LENGTH}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Post Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
