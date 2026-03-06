import bcrypt from "bcryptjs";

const gerarHash = async () => {
  const senha = "123456"; // senha que você quer pro admin
  const hash = await bcrypt.hash(senha, 10);
  console.log("Hash gerado:", hash);
};

gerarHash();