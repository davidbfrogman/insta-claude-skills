-- These guides use tables purely for page layout, not tabular data.
-- Flatten each table into its cells' blocks so the prose survives without grid formatting.
local function cells_of(row, out)
  for _, cell in ipairs(row.cells) do
    for _, b in ipairs(cell.contents) do out[#out + 1] = b end
  end
end

function Table(el)
  local out = {}
  for _, row in ipairs(el.head.rows) do cells_of(row, out) end
  for _, body in ipairs(el.bodies) do
    for _, row in ipairs(body.head) do cells_of(row, out) end
    for _, row in ipairs(body.body) do cells_of(row, out) end
  end
  return out
end
