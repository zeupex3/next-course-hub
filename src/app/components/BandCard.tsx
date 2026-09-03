import Image from "next/image";
import { Band } from "../type/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <article className="courseCard" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#14532d", marginBottom: "0.1rem" }}>
        {band.name}
      </h2>
      
      <p style={{ color: "#4b5563", marginBottom: "0.5rem" }}>
        <strong>แนวเพลง:</strong> {band.genre}
      </p>
      
      {/* รูปวง */}
      <div style={{ position: "relative", width: "100%", height: "220px" }}>
        <Image 
          src={band.imageUrl} 
          alt={band.name} 
          fill
          style={{ objectFit: "contain", borderRadius: "8px" }} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", margin: "0.5rem 0" }} />

      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#14532d" }}>
        สมาชิกวง:
      </h3>
      
      {/* รายชื่อสมาชิก */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {band.members.map((member, index) => (
          <div key={index} style={{ 
            display: "flex", 
            alignItems: "center",
            gap: "12px", 
            backgroundColor: "#f0fdf4",
            padding: "0.75rem", 
            borderRadius: "10px",
            border: "1px solid #dcfce7"
          }}>
            
            {/* รูปสมาชิก */}
            {member.imageUrl ? (
              <div style={{ 
                position: "relative", 
                width: "60px",   
                height: "60px",  
                borderRadius: "10px", 
                overflow: "hidden",
                border: "2px solid #fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
                <Image 
                  src={member.imageUrl} 
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "6px",
                backgroundColor: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#166534",
                flexShrink: 0
              }}>
                {member.name[0]}
              </div>
            )}

            {/* ชื่อและตำแหน่ง */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1, overflow: "hidden" }}>
              <span style={{ fontWeight: "600", color: "#1f2937", fontSize: "1.25rem" }}>
                {member.name}
              </span>
              <span style={{ 
                color: "#166534",
                fontSize: "1rem",
                fontWeight: "500",
                marginTop: "2px"
              }}>
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}