package mx.edu.potros.examenu1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import java.util.Locale

class MainActivity : AppCompatActivity() {
    val gradoC:EditText=findViewById(R.id.etC)
    val gradoF:EditText=findViewById(R.id.etF)
    val calcularC:Button=findViewById(R.id.btnGC)
    val calcularF:Button=findViewById(R.id.btnGF)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        calcularC.setOnClickListener{
            convertirGradoC()
        }
        calcularF.setOnClickListener{
            convertirGradoF()
        }

    }
    fun convertirGradoF(){
        val c=gradoC.text.toString().toDoubleOrNull()
        if(c!=null){
            val f=c*1.8+32
            gradoF.setText(String.format(Locale.US,"%.2f",f))
        }
    }
    fun convertirGradoC(){
        val f=gradoF.text.toString().toDoubleOrNull()
        if(f!=null){
            val c=(f-32)/1.8
            gradoF.setText(String.format(Locale.US,"%.2f",c))
        }
    }
}