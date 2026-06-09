import { GrpcOptions, Transport } from '@nestjs/microservices';

const staticBaseProtoPath = `${__dirname}/../../../proto`;

const resolveProtoPath = (code: string, protoPath: string) => {
  return (
    process.env[`${code}_PROTO_PATH`] || `${staticBaseProtoPath}/${protoPath}`
  );
};

const grpcAddress = (code: string) => {
  return (
    process.env[`GRPC_${code}_ADDRESS`] ||
    `127.0.0.1:${process.env[`${code}_SERVICE_GRPC_PORT`]}`
  );
};

export const buildClientModule = (
  name: string,
  packageName: string,
  code: string,
  protoPath: string,
): { name: string } & GrpcOptions => {
  return {
    name: name,
    transport: Transport.GRPC,
    options: {
      package: packageName,
      protoPath: resolveProtoPath(code, protoPath),
      url: grpcAddress(code),
    },
  };
};
