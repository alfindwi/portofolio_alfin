import * as React from "react";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <div style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <h2>Pesan Baru dari Website</h2>
      <p><b>Nama:</b> {name}</p>
      <p><b>Email:</b> {email}</p>
      <p><b>Pesan:</b> {message}</p>
    </div>
  );
}
