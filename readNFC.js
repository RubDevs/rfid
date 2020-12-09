async function readTag() {
    let id = document.getElementById('rfid')
    if ("NDEFReader" in window) {
      const reader = new NDEFReader();
      try {
        await reader.scan();
        reader.onreading = event => {
          id.value = "hola, entro al evento"
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            console.log("Record type:  " + record.recordType);
            console.log("MIME type:    " + record.mediaType);
            console.log("=== data ===\n" + decoder.decode(record.data));
            id.value = record.id
          }
        }
      } catch(error) {
        consoleLog(error);
        id.value = "hubo error"
      }
    } else {
      console.log("Web NFC is not supported.");
    }
}

