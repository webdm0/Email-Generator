"use client";

import { motion } from "framer-motion";

import { signOutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </motion.div>
    </form>
  );
}
