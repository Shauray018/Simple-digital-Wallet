"use client";

import { useBalance } from "C:/Users/Asus/Downloads/Paytm CLone/paytmplease/packages/store/src/hooks/useBalance";

export default function Try() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}