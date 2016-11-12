/**
 * Created by clicktronix on 12.11.16.
 */

let context = require.context('./dev', true, /tests\.js$/);
context.keys().forEach(context);