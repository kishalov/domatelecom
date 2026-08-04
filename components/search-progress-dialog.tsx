"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SearchProgressDialog({
  open,
  street,
  onOpenChange,
}: {
  open: boolean;
  street: string;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-10 text-center sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center text-2xl">
            Поиск провайдеров...
          </DialogTitle>
          <DialogDescription className="text-center">
            Проверяем адрес и подбираем доступные тарифы.
          </DialogDescription>
        </DialogHeader>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full animate-[progress_2.5s_ease-in-out] bg-primary"
            style={{ width: "100%" }}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Проверяем адрес: {street}
        </p>
      </DialogContent>
    </Dialog>
  );
}
