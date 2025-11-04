local cjson = require "cjson.safe"

local JwtClaimsInjector = {
  PRIORITY = 800,
  VERSION = "1.0.0",
}

local function base64_decode(input)
  input = input:gsub("-", "+"):gsub("_", "/")
  local pad = #input % 4
  if pad > 0 then
    input = input .. string.rep("=", 4 - pad)
  end
  return ngx.decode_base64(input)
end

function JwtClaimsInjector:access(conf)
  local authorization = kong.request.get_header("authorization")
  if not authorization then
    return
  end

  local token = authorization:match("Bearer%s+(.+)")
  if not token then
    return
  end

  local _, payload_b64 = token:match("([^%.]+)%.([^%.]+)%.([^%.]+)")
  if not payload_b64 then
    kong.log.err("JWT inválido")
    return
  end

  local payload_json = base64_decode(payload_b64)
  if not payload_json then
    kong.log.err("Falha ao decodificar payload JWT")
    return
  end

  local claims = cjson.decode(payload_json)
  if not claims then
    kong.log.err("Falha ao parsear claims JWT")
    return
  end

  for k, v in pairs(claims) do
    if type(v) == "table" then
      -- Se for um array, concatena os valores com vírgulas
      local array_value = table.concat(v, ",")
      kong.service.request.set_header("x-Request-" .. k, array_value)
    else
      kong.service.request.set_header("x-Request-" .. k, tostring(v))
    end
  end
end

return JwtClaimsInjector
