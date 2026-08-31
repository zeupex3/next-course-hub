import Image from "next/image";
import { Band } from "../type/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <article className="courseCard" style={{ padding: "1.5rem" }}>
      {/* ชื่อวงดนตรี */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#14532d", marginBottom: "0.25rem" }}>
        {band.name}
      </h2>
      
      <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
        <strong>แนวเพลง:</strong> {band.genre}
      </p>
      
      <div style={{ position: "relative", width: "100%", height: "250px", margin: "10px 0" }}>
        <Image 
          src={band.imageUrl} 
          alt={band.name} 
          fill
          style={{ objectFit: "contain", borderRadius: "8px" }} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "1rem 0" }} />

      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#14532d", marginBottom: "0.5rem" }}>
        สมาชิกวง:
      </h3>
      
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {band.members.map((member, index) => (
          <li key={index} style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            backgroundColor: "#f0fdf4",
            padding: "0.5rem 0.75rem", 
            marginBottom: "0.35rem", 
            borderRadius: "6px",
            border: "1px solid #dcfce7"
          }}>
            <span style={{ fontWeight: "600", color: "#1f2937" }}>
              {member.name}
            </span>
            
            <span style={{ 
              backgroundColor: "#dcfce7", 
              color: "#166534",
              padding: "0.1rem 0.6rem", 
              borderRadius: "4px", 
              fontSize: "0.85rem",
              fontWeight: "600"
            }}>
              {member.role}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}