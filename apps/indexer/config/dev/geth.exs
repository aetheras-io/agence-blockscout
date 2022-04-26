use Mix.Config

config :indexer,
  block_interval: System.get_env("ETH_BLOCK_INTERVAL", "5")
    |> Integer.parse()
    |> elem(0)
    |> :timer.seconds(),
  json_rpc_named_arguments: [
    transport:
      if(System.get_env("ETHEREUM_JSONRPC_TRANSPORT", "http") == "http",
        do: EthereumJSONRPC.HTTP,
        else: EthereumJSONRPC.IPC
      ),
    transport_options: [
      http: EthereumJSONRPC.HTTP.HTTPoison,
      url: System.get_env("ETHEREUM_JSONRPC_HTTP_URL") || "http://localhost:8545",
      http_options: [recv_timeout: :timer.minutes(1), timeout: :timer.minutes(1), hackney: [pool: :ethereum_jsonrpc]]
    ],
    variant: EthereumJSONRPC.Geth
  ],
  subscribe_named_arguments: [
    transport:
      System.get_env("ETHEREUM_JSONRPC_WS_URL") && System.get_env("ETHEREUM_JSONRPC_WS_URL") !== "" &&
        EthereumJSONRPC.WebSocket,
    transport_options: [
      web_socket: EthereumJSONRPC.WebSocket.WebSocketClient,
      url: System.get_env("ETHEREUM_JSONRPC_WS_URL")
    ]
  ]
