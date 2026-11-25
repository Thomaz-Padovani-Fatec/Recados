import { useEffect, useState } from "react";
import "./BirthdayVillagers.css";

const API_URL = "https://api.nookipedia.com/villagers";
const API_KEY = process.env.REACT_APP_NOOKIPEDIA_KEY;

export default function BirthdayVillagers({ date = new Date() }) {
  const [villagers, setVillagers] = useState([]);
  const [status, setStatus] = useState("loading");

  const birthmonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const birthday = String(date.getDate());

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    const params = new URLSearchParams({ birthmonth, birthday });

    fetch(`${API_URL}?${params}`, {
      headers: { "X-API-KEY": API_KEY },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVillagers(data);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, [birthmonth, birthday]);

  if (status === "loading") return <p>Carregando aniversariantes…</p>;
  if (status === "error") return <p>Não foi possível carregar os aniversariantes.</p>;
  if (villagers.length === 0) return <p>Nenhum aniversariante hoje.</p>;

  return (
    <section>
      <h2>🎂 Aniversariantes de hoje</h2>
      <ul className="villager-list">
        {villagers.map((v) => (
          <li key={v.id} className="villager-card">
            <a href={v.url} target="_blank" rel="noopener noreferrer">
              <img src={v.image_url} alt={v.name} loading="lazy" />
              <span>{v.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
