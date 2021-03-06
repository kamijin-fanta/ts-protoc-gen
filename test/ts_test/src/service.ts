import {resolve} from "path";
import {readFileSync} from "fs";
import {assert} from "chai";
import * as simple_service_pb_service from "../generated/examplecom/simple_service_pb_service";
import * as simple_service_pb from "../generated/examplecom/simple_service_pb";
import * as external_child_message_pb from "../generated/othercom/external_child_message_pb";

describe("ts service", () => {
  it("should generate a service definition", () => {
    assert.strictEqual(simple_service_pb_service.SimpleService.serviceName, "examplecom.SimpleService");

    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.methodName, "DoUnary");
    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.service, simple_service_pb_service.SimpleService);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.requestStream, false);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.responseStream, false);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.requestType, simple_service_pb.UnaryRequest);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoUnary.responseType, external_child_message_pb.ExternalChildMessage);

    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.methodName, "DoStream");
    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.service, simple_service_pb_service.SimpleService);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.requestStream, false);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.responseStream, true);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.requestType, simple_service_pb.StreamRequest);
    assert.strictEqual(simple_service_pb_service.SimpleService.DoStream.responseType, external_child_message_pb.ExternalChildMessage);
  });
  it("should not output imports for namespaces that are not used in the service definition", () => {
    const generatedService = readFileSync(resolve(__dirname, "../../generated/examplecom/simple_service_pb_service.ts"), "utf8");
    assert.notInclude(generatedService, "google-protobuf/google/protobuf/timestamp_pb");

    const generatedProto = readFileSync(resolve(__dirname, "../../generated/examplecom/simple_service_pb.js"), "utf8");
    assert.include(generatedProto, "google-protobuf/google/protobuf/timestamp_pb");
  });
});
