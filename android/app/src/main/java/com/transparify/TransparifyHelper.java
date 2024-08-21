package com.transparify;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Shader;
import android.net.Uri;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class TransparifyHelper extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    public TransparifyHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TransparifyHelper";
    }

    @ReactMethod
    public void mergeImageWithBackground(String base64Image, ReadableMap backgroundData, Promise promise) {
        try {
            byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
            Bitmap originalBitmap = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            Bitmap resultBitmap = Bitmap.createBitmap(originalBitmap.getWidth(), originalBitmap.getHeight(), Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(resultBitmap);

            if (backgroundData.hasKey("type")) {
                String type = backgroundData.getString("type");
                Paint paint = new Paint();

                switch (type) {
                    case "color":
                        paint.setColor(Color.parseColor(backgroundData.getString("color")));
                        canvas.drawRect(0, 0, canvas.getWidth(), canvas.getHeight(), paint);
                        break;
                    case "gradient":
                        ReadableMap gradientData = backgroundData.getMap("gradient");
                        int startColor = Color.parseColor(gradientData.getString("startColor"));
                        int endColor = Color.parseColor(gradientData.getString("endColor"));
                        LinearGradient gradient = new LinearGradient(0, 0, 0, canvas.getHeight(), startColor, endColor, Shader.TileMode.CLAMP);
                        paint.setShader(gradient);
                        canvas.drawRect(0, 0, canvas.getWidth(), canvas.getHeight(), paint);
                        break;
                    case "image":
                        String imageUri = backgroundData.getString("uri");
                        File imageFile = new File(Uri.parse(imageUri).getPath());
                        Bitmap backgroundBitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());

                        float scaleWidth = (float) canvas.getWidth() / backgroundBitmap.getWidth();
                        float scaleHeight = (float) canvas.getHeight() / backgroundBitmap.getHeight();
                        float scale = Math.max(scaleWidth, scaleHeight);

                        Matrix matrix = new Matrix();
                        matrix.postScale(scale, scale);

                        Bitmap scaledBackgroundBitmap = Bitmap.createBitmap(backgroundBitmap, 0, 0, backgroundBitmap.getWidth(), backgroundBitmap.getHeight(), matrix, true);
                        float left = (canvas.getWidth() - scaledBackgroundBitmap.getWidth()) / 2f;
                        float top = (canvas.getHeight() - scaledBackgroundBitmap.getHeight()) / 2f;

                        canvas.drawBitmap(scaledBackgroundBitmap, left, top, null);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid background type");
                }
            } else {
                throw new IllegalArgumentException("Background type not specified");
            }
            canvas.drawBitmap(originalBitmap, 0, 0, null);

            File outputDir = reactContext.getCacheDir();
            File outputFile = File.createTempFile("tnspym", ".png", outputDir);
            FileOutputStream fos = new FileOutputStream(outputFile);
            resultBitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
            fos.close();

            promise.resolve(outputFile.getAbsolutePath());
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to process image: " + e.getMessage());
        }
    }
}
