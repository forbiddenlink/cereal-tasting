/** Canvas-drawn certificate PNG — no DOM screenshot deps. */

export interface CertificatePngInput {
  name: string;
  certNumber: string;
  dateLabel: string;
  year: number;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ');
  let line = '';
  let cursorY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
  return cursorY;
}

export async function downloadCertificatePng(input: CertificatePngInput): Promise<void> {
  const width = 1400;
  const height = 1000;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  // Parchment
  ctx.fillStyle = '#f5f0e1';
  ctx.fillRect(0, 0, width, height);

  // Outer double border
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Corner ornaments
  ctx.lineWidth = 3;
  const corner = 70;
  const inset = 70;
  for (const [cx, cy, dx, dy] of [
    [inset, inset, 1, 1],
    [width - inset, inset, -1, 1],
    [inset, height - inset, 1, -1],
    [width - inset, height - inset, -1, -1],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * corner);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * corner, cy);
    ctx.stroke();
  }

  ctx.fillStyle = '#997b28';
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('INTERNATIONAL CEREAL AUTHORITY', width / 2, 130);

  ctx.fillStyle = '#1a1a1a';
  ctx.font = '700 64px "Playfair Display", Georgia, serif';
  ctx.fillText("The Sommelier's Spoon", width / 2, 210);

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 120, 240);
  ctx.lineTo(width / 2 + 120, 240);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.font = '400 22px "JetBrains Mono", monospace';
  ctx.fillText('This certifies that', width / 2, 300);

  ctx.fillStyle = '#1a1a1a';
  ctx.font = '700 52px "Playfair Display", Georgia, serif';
  ctx.fillText(input.name, width / 2, 370);

  ctx.strokeStyle = '#d4af37';
  ctx.beginPath();
  ctx.moveTo(width / 2 - Math.min(280, input.name.length * 14), 390);
  ctx.lineTo(width / 2 + Math.min(280, input.name.length * 14), 390);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillText('has completed the rigorous* examination', width / 2, 440);
  ctx.fillText('and is hereby granted the title of', width / 2, 470);

  ctx.fillStyle = '#d4af37';
  ctx.font = '700 36px "Playfair Display", Georgia, serif';
  ctx.fillText('CERTIFIED CEREAL SOMMELIER', width / 2, 530);

  ctx.fillStyle = '#999999';
  ctx.font = '400 18px "JetBrains Mono", monospace';
  ctx.fillText(`Class of ${input.year}`, width / 2, 565);

  const rights = [
    "Judging others' cereal choices silently",
    'Requesting "the cereal list" at restaurants',
    'Using the word "mouthfeel" unironically',
    'Sniffing cereal boxes in public without explanation',
    'Referring to milk as "the medium"',
  ];

  ctx.fillStyle = '#555555';
  ctx.font = '400 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  let y = 620;
  ctx.fillText('With all rights and privileges therein, including:', 180, y);
  y += 36;
  for (const right of rights) {
    ctx.fillText(`•  ${right}`, 200, y);
    y += 28;
  }

  // Signature block
  ctx.strokeStyle = '#d4af37';
  ctx.beginPath();
  ctx.moveTo(180, 820);
  ctx.lineTo(420, 820);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width - 420, 820);
  ctx.lineTo(width - 180, 820);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.font = 'italic 18px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('Jacques Flakémont III', 180, 850);
  ctx.font = '400 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#999999';
  ctx.fillText('Grand Sommelier & Founder', 180, 872);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#666666';
  ctx.font = '400 16px "JetBrains Mono", monospace';
  ctx.fillText(`Certificate No: ${input.certNumber}`, width - 180, 850);
  ctx.fillStyle = '#999999';
  ctx.font = '400 14px "JetBrains Mono", monospace';
  ctx.fillText(input.dateLabel, width - 180, 872);

  // Wax seal
  const sealX = width / 2;
  const sealY = 845;
  const grad = ctx.createRadialGradient(sealX - 10, sealY - 10, 8, sealX, sealY, 42);
  grad.addColorStop(0, '#b8860b');
  grad.addColorStop(1, '#6b4f12');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f5f0e1';
  ctx.font = '700 22px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('SS', sealX, sealY + 8);

  ctx.fillStyle = '#bbbbbb';
  ctx.font = '400 13px "JetBrains Mono", monospace';
  wrapText(
    ctx,
    "* rigor not guaranteed • Filed with the International Cereal Archives (a shoebox in Jacques' apartment)",
    width / 2,
    940,
    900,
    18,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png'),
  );
  if (!blob) throw new Error('PNG encoding failed');

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = input.name.replace(/[^\w-]+/g, '_').slice(0, 40) || 'sommelier';
  link.download = `cereal-sommelier-${safeName}-${input.certNumber}.png`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
